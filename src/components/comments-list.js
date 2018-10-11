import React, { Component } from 'react'
import Comment from './comment'
import showHideDecorator from '../decorators/showHide'

class CommentsList extends Component {
  render() {
    const { isShow, toggleItemShowingState } = this.props
    const text = isShow ? 'Close Comments' : 'Show comments'

    return (
      <div>
        <button onClick={toggleItemShowingState}> {text} </button>
        {isShow && <ul>{this.items}</ul>}
      </div>
    )
  }

  get items() {
    const { comments } = this.props
    return comments.map((comment) => (
      <li key={comment.id}>
        <Comment comment={comment} />
      </li>
    ))
  }
}

export default showHideDecorator(CommentsList)
