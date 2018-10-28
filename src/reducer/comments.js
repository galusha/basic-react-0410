import {} from '../constants'
import { normalizedComments } from '../fixtures'
import { ADD_NEW_COMMENT } from '../constants'

const defaultComments = normalizedComments.reduce(
  (acc, comment) => ({
    ...acc,
    [comment.id]: comment
  }),
  {}
)

export default (state = defaultComments, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_NEW_COMMENT:
      const { comment } = payload
      return { ...state, [comment.id]: comment }
    default:
      return state
  }
}
