import {
  CHANGE_COMMENT_FORM,
  ADD_NEW_COMMENT,
  SET_VALIDATION_ERROR,
  CLEAR_FORM
} from '../constants'

const forms = {
  addNewComment: {
    comment: {
      text: '',
      user: ''
    },
    validationError: ''
  }
}

export default (state = forms, action) => {
  const { type, payload } = action
  let formName

  switch (type) {
    case CHANGE_COMMENT_FORM:
      return {
        ...state,
        addNewComment: {
          ...state.addNewComment,
          comment: { ...state.addNewComment.comment, ...payload }
        }
      }
    case ADD_NEW_COMMENT:
      return {
        ...state,
        addNewComment: {
          ...state.addNewComment,
          comment: { ...forms.addNewComment.comment },
          validationError: ''
        }
      }
    case SET_VALIDATION_ERROR:
      const { validationError } = payload
      formName = payload.formName
      return { ...state, [formName]: { ...state[formName], validationError } }
    case CLEAR_FORM:
      formName = payload.formName
      return { ...state, [formName]: { ...forms[formName] } }
    default:
      return state
  }
}
