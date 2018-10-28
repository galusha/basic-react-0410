import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import Comment from '../comment'
import toggleOpen from '../../decorators/toggleOpen'
import './style.css'
import { connect } from 'react-redux'
import {
  changeCommentForm,
  addNewComment,
  setValidationError,
  clearForm
} from '../../ac'

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    //from toggleOpen decorator
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  render() {
    const { isOpen } = this.props
    const buttonText = isOpen ? 'hide comments' : 'show comments'
    return (
      <div>
        <button onClick={this.toggleOpen} className="test--comment-list__btn">
          {buttonText}
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

  toggleOpen = () => {
    const { toggleOpen } = this.props
    toggleOpen(this.clearCommentForm)
  }

  clearCommentForm = (toogleState) => {
    if (!toogleState.isOpen) {
      const { clearForm } = this.props
      clearForm('addNewComment')
    }
  }

  changeCommentForm = (e) => {
    const { changeCommentForm } = this.props
    const change = { [e.target.name]: e.target.value }

    changeCommentForm(change)
  }

  addNewComment = (e) => {
    e.preventDefault()

    const formName = e.target.name
    const {
      addNewCommentForm: { comment },
      addNewComment,
      articleId
    } = this.props

    if (this.validateComment(comment, formName)) {
      addNewComment(comment, articleId)
    }
  }

  validateComment = (comment, formName) => {
    if (comment.text && comment.user) {
      return true
    } else {
      const { setValidationError } = this.props
      setValidationError(formName, 'Text or Author field is empty')
    }
  }

  getBody() {
    const {
      comments = [],
      isOpen,
      addNewCommentForm: {
        comment: { text, user },
        validationError
      }
    } = this.props
    if (!isOpen) return null

    return (
      <div className="test--comment-list__body">
        <div className="error">{validationError}</div>
        <form
          className="comment-form"
          name="addNewComment"
          onSubmit={this.addNewComment}
        >
          <label>
            Comment Text
            <input value={text} name="text" onChange={this.changeCommentForm} />
          </label>
          <label>
            Author
            <input value={user} name="user" onChange={this.changeCommentForm} />
          </label>
          <button>Add New Comment</button>
        </form>
        {comments.length ? (
          this.comments
        ) : (
          <h3 className="test--comment-list__empty">No comments yet</h3>
        )}
      </div>
    )
  }

  get comments() {
    return (
      <ul>
        {this.props.comments.map((id) => (
          <li key={id} className="test--comment-list__item">
            <Comment id={id} />
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(
  (state) => ({
    addNewCommentForm: state.forms.addNewComment
  }),
  {
    changeCommentForm,
    addNewComment,
    setValidationError,
    clearForm
  }
)(toggleOpen(CommentList))
