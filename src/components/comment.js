import React, { Component } from 'react'

class Comment extends Component {
  render() {
    const { comment } = this.props
    return (
      <div>
        <p>
          author: <i>{comment.user}</i>
        </p>
        <p>{comment.text}</p>
      </div>
    )
  }
}

export default Comment
