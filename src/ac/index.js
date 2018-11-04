import {
  INCREMENT,
  DELETE_ARTICLE,
  CHANGE_DATE_RANGE,
  CHANGE_SELECTION,
  ADD_COMMENT,
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE,
  LOAD_ARTICLE_COMMENTS,
  LOAD_COMMENTS_BY_PAGE,
  CHANGE_CURRENT_PAGE,
  SUCCESS,
  FAIL,
  START
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

export function addComment(comment, articleId) {
  return {
    type: ADD_COMMENT,
    payload: { comment, articleId },
    generateId: true
  }
}

export function loadAllArticles() {
  return {
    type: LOAD_ALL_ARTICLES,
    callAPI: '/api/article'
  }
}

export function loadArticleById(id) {
  return (dispatch) => {
    dispatch({
      type: LOAD_ARTICLE + START,
      payload: { id }
    })

    fetch(`/api/article/${id}`)
      .then((res) => res.json())
      .then((response) =>
        dispatch({
          type: LOAD_ARTICLE + SUCCESS,
          payload: { id },
          response
        })
      )
      .catch((error) =>
        dispatch({
          type: LOAD_ARTICLE + FAIL,
          payload: { id },
          error
        })
      )
  }
}

export function loadArticleComments(articleId) {
  return {
    type: LOAD_ARTICLE_COMMENTS,
    payload: { articleId },
    callAPI: `/api/comment?article=${articleId}`
  }
}

export function loadCommentsByPage(currentPage = 1, step = 5, isLoaded) {
  const offset = (currentPage - 1) * step || 0

  return (dispatch) => {
    if (isLoaded) {
      dispatch({
        type: CHANGE_CURRENT_PAGE,
        payload: { currentPage }
      })
    } else {
      dispatch({
        type: LOAD_COMMENTS_BY_PAGE + START,
        payload: { currentPage }
      })

      fetch(`/api/comment?limit=${step}&offset=${offset}`)
        .then((res) => res.json())
        .then((response) => {
          dispatch({
            type: LOAD_COMMENTS_BY_PAGE + SUCCESS,
            payload: { currentPage },
            response
          })
        })
        .catch((error) =>
          dispatch({
            type: LOAD_COMMENTS_BY_PAGE + FAIL,
            payload: {},
            error
          })
        )
    }
  }
}
