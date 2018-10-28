import {
  INCREMENT,
  DELETE_ARTICLE,
  CHANGE_DATE_RANGE,
  CHANGE_SELECTION,
  CHANGE_COMMENT_FORM,
  ADD_NEW_COMMENT,
  SET_VALIDATION_ERROR,
  CLEAR_FORM
} from '../constants'

export function increment() {
  return {
    type: INCREMENT
  }
}

export function deleteArticle(id) {
  return {
    type: DELETE_ARTICLE,
    payload: { id }
  }
}

export function changeDateRange(dateRange) {
  return {
    type: CHANGE_DATE_RANGE,
    payload: { dateRange }
  }
}

export function changeSelection(selected) {
  return {
    type: CHANGE_SELECTION,
    payload: { selected }
  }
}

export function changeCommentForm(change) {
  return {
    type: CHANGE_COMMENT_FORM,
    payload: change
  }
}

export function addNewComment(comment, articleId) {
  return {
    type: ADD_NEW_COMMENT,
    payload: { comment, articleId }
  }
}

export function setValidationError(formName, validationError) {
  return {
    type: SET_VALIDATION_ERROR,
    payload: { formName, validationError }
  }
}

export function clearForm(formName) {
  return {
    type: CLEAR_FORM,
    payload: { formName }
  }
}
