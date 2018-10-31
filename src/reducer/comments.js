import { ADD_COMMENT } from '../constants'
import { normalizedComments } from '../fixtures'
import { arrToMap } from './utils'
import { Record } from 'immutable'

const CommentRecord = Record({
  id: null,
  user: null,
  text: null
})

const ReducerRecord = Record({
  entities: arrToMap(normalizedComments, CommentRecord),
  loading: false,
  loaded: false,
  error: null
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId } = action

  switch (type) {
    case ADD_COMMENT:
      return state.setIn(
        ['entities', randomId],
        new CommentRecord({ ...payload.comment, id: randomId })
      )

    // return {
    //   ...state,
    //   [randomId]: {
    //     ...payload.comment,
    //     id: randomId
    //   }
    // }

    default:
      return state
  }
}
