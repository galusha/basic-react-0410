import {
  ADD_COMMENT,
  LOAD_ARTICLE_COMMENTS,
  LOAD_COMMENTS_BY_PAGE,
  CHANGE_CURRENT_PAGE,
  START,
  SUCCESS
} from '../constants'
import { Record, OrderedMap } from 'immutable'
import { arrToMap } from './utils'

const CommentRecord = Record({
  id: null,
  text: null,
  user: null
})

const PageStateRecord = Record({
  number: null,
  commentIds: [],
  loading: true,
  loaded: false
})

const ReducerRecord = Record({
  entities: new OrderedMap({}),
  pagination: {
    currentPage: 1,
    step: 5,
    count: null,
    pagesState: new OrderedMap({})
  }
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case ADD_COMMENT:
      return state.setIn(
        ['entities', randomId],
        new CommentRecord({
          ...payload.comment,
          id: randomId
        })
      )

    case LOAD_ARTICLE_COMMENTS + SUCCESS:
      return state.mergeIn(['entities'], arrToMap(response, CommentRecord))

    case LOAD_COMMENTS_BY_PAGE + START:
      return state
        .setIn(['pagination', 'currentPage'], payload.currentPage)
        .setIn(
          ['pagination', 'pagesState', payload.currentPage],
          new PageStateRecord()
        )

    case LOAD_COMMENTS_BY_PAGE + SUCCESS:
      return state
        .mergeIn(['entities'], arrToMap(response.records, CommentRecord))
        .setIn(['pagination', 'count'], response.total)
        .setIn(
          ['pagination', 'pagesState', payload.currentPage, 'commentIds'],
          response.records.map((comment) => comment.id)
        )
        .setIn(
          ['pagination', 'pagesState', payload.currentPage, 'loading'],
          false
        )
        .setIn(
          ['pagination', 'pagesState', payload.currentPage, 'loaded'],
          true
        )

    case CHANGE_CURRENT_PAGE:
      return state.setIn(['pagination', 'currentPage'], payload.currentPage)

    default:
      return state
  }
}
