import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import Comment from '../comment'
import CommentForm from '../comment-form'
import { connect } from 'react-redux'
import toggleOpen from '../../decorators/toggleOpen'
import Loader from '../common/loader'
import './style.css'

import { loadCommentsByArticleId } from '../../ac'

class CommentList extends Component {
  static propTypes = {
    article: PropTypes.object,
    //from toggleOpen decorator
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  /*
  static defaultProps = {
    comments: []
  }
*/

  componentDidUpdate(oldProps) {
    const { isOpen, loadCommentsByArticleId, article } = this.props
    if (!oldProps.isOpen && isOpen && !article.commentsLoaded)
      loadCommentsByArticleId(article.id)
  }

  render() {
    const { isOpen, toggleOpen } = this.props
    const text = isOpen ? 'hide comments' : 'show comments'
    return (
      <div>
        <button onClick={toggleOpen} className="test--comment-list__btn">
          {text}
        </button>
        <CSSTransition
          transitionName="comments"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.getBody()}
        </CSSTransition>
      </div>
    )
  }

  getBody() {
    const {
      article: { id, commentsLoaded, comments = [] },
      isOpen
    } = this.props
    if (!isOpen) return null

    console.log('commentsLoaded', commentsLoaded)

    return (
      <div className="test--comment-list__body">
        {(!commentsLoaded && <Loader />) ||
          (comments.length ? (
            this.comments
          ) : (
            <h3 className="test--comment-list__empty">No comments yet</h3>
          ))}
        <CommentForm articleId={id} />
      </div>
    )
  }

  get comments() {
    console.log('---->comments', this.props.article.comments)
    return (
      <ul>
        {this.props.article.comments.map((id) => (
          <li key={id} className="test--comment-list__item">
            <Comment id={id} />
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(
  null,
  { loadCommentsByArticleId }
)(toggleOpen(CommentList))
