import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Comment from '../comment'
import Pagination from '../pagination'
import { loadCommentsByPage } from '../../ac'
import Loader from '../common/loader'
import {
  commentsByPageSelector,
  commentsCountSelector,
  commentsCurrentPageSelector,
  commentsStepSelector,
  loadingByPageSelector,
  loadedByPageSelector,
  pagesStateSelector
} from '../../selectors'

class CommentsPage extends Component {
  loadCommentsByPage = (page) => {
    const { step, loadCommentsByPage, pagesState } = this.props
    const pageState = pagesState.get(page)
    const isLoaded = pageState && pageState.get('loaded')

    loadCommentsByPage(page, step, isLoaded)
  }

  componentDidMount() {
    const {
      loadCommentsByPage,
      match: {
        params: { page: currentPage }
      }
    } = this.props
    loadCommentsByPage(currentPage)
  }

  render() {
    const {
      comments,
      count,
      step,
      loading,
      match: {
        params: { page: currentPage }
      }
    } = this.props
    const pagesCount = (count && Math.ceil(count / step)) || 0

    return (
      <Fragment>
        <Pagination
          currentPage={currentPage}
          pagesCount={pagesCount}
          fetchData={this.loadCommentsByPage}
        />
        {loading ? (
          <Loader />
        ) : !currentPage || currentPage > pagesCount ? (
          <h1>Please Select Page from 1 to {pagesCount} </h1>
        ) : (
          comments &&
          comments.map((id) => {
            return (
              <li key={id}>
                <Comment id={id} />
              </li>
            )
          })
        )}
      </Fragment>
    )
  }
}

export default connect(
  (state) => ({
    comments: commentsByPageSelector(state),
    count: commentsCountSelector(state),
    step: commentsStepSelector(state),
    currentPage: commentsCurrentPageSelector(state),
    loading: loadingByPageSelector(state),
    loaded: loadedByPageSelector(state),
    pagesState: pagesStateSelector(state)
  }),
  { loadCommentsByPage }
)(CommentsPage)
