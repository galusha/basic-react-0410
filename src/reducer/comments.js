import { ADD_COMMENT, LOAD_COMMENTS, SUCCESS, START } from '../constants'
import { normalizedComments } from '../fixtures'
import { arrToMap } from './utils'
import { Record } from 'immutable'

const CommentRecord = Record({
  id: null,
  user: null,
  text: null
})

const ReducerRecord = Record({
  entities: arrToMap([], CommentRecord),
  loading: false,
  loaded: false,
  error: null
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case ADD_COMMENT:
      return state.setIn(
        ['entities', randomId],
        new CommentRecord({ ...payload.comment, id: randomId })
      )

    case LOAD_COMMENTS + START:
      return state.set('loading', true)

    case LOAD_COMMENTS + SUCCESS:
      return state
        .set(
          'entities',
          state.get('entities').merge(arrToMap(response, CommentRecord))
        )
        .set('loading', false)
        .set('loaded', true)

    default:
      return state
  }
}
