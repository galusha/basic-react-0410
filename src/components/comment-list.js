import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import Comment from './comment'
import toggleOpen from '../decorators/toggleOpen'

export class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  render() {
    const { isOpen, toggleOpen } = this.props
    const text = isOpen ? 'hide comments' : 'show comments'
    return (
      <div>
        <button className="test--comments__toogle_button" onClick={toggleOpen}>
          {text}
        </button>
        <CSSTransition
          transitionAppear
          transitionName="comment-list"
          transitionEnterTimeout={500}
          transitionAppearTimeout={1000}
          transitionLeaveTimeout={300}
        >
          {this.getBody()}
        </CSSTransition>
      </div>
    )
  }

  getBody() {
    //    const { comments = [], isOpen } = this.props
    const { comments, isOpen } = this.props
    if (!isOpen) return null

    const body = comments.length ? (
      <ul className="test--comments__list">
        {comments.map((comment) => (
          <li className="test--comments__item" key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    ) : (
      <h3 className="test--comments__empty">No comments yet</h3>
    )

    return <div>{body}</div>
  }
}

const CommentListWithToggleOpen = toggleOpen(CommentList)

export default CommentListWithToggleOpen
