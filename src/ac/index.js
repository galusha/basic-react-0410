import {
  INCREMENT,
  DELETE_ARTICLE,
  CHANGE_DATE_RANGE,
  CHANGE_SELECTION,
  CHANGE_COMMENT_FORM,
  ADD_NEW_COMMENT
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
    payload: { ...change }
  }
}

export function addNewComment(comment) {
  return {
    type: ADD_NEW_COMMENT,
    payload: { comment }
  }
}
