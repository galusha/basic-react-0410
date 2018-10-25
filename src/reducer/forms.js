import { CHANGE_COMMENT_FORM } from '../constants'

const forms = {
  comment: {
    text: '',
    author: ''
  }
}

export default (state = forms, action) => {
  const { type, payload } = action

  console.log('payload', payload)
  switch (type) {
    case CHANGE_COMMENT_FORM:
      return { ...state, comment: { ...state.comment, ...payload } }
      break
  }
  return state
}
