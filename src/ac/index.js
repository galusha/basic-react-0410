import { INCREMENT, DELETE_ARTICLE, SET_FILTER } from '../constants'

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

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: filter
  }
}
