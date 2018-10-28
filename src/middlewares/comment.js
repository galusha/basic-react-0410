import { ADD_NEW_COMMENT } from '../constants'

import uid from 'uid'

export default (store) => (next) => (action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_NEW_COMMENT:
      payload.comment.id = uid(10)
      payload.comment.date = new Date()
      break
  }

  next(action)
}
