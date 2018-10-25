import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import Comment from '../comment'
import toggleOpen from '../../decorators/toggleOpen'
import './style.css'
import { connect } from 'react-redux'
import { changeCommentForm } from '../../ac'

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    //from toggleOpen decorator
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  /*
  static defaultProps = {
    comments: []
  }
*/

  render() {
    console.log('this.props', this.props)
    const { isOpen, toggleOpen } = this.props
    const buttonText = isOpen ? 'hide comments' : 'show comments'
    return (
      <div>
        <button onClick={toggleOpen} className="test--comment-list__btn">
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

  changeCommentForm = (e) => {
    const { changeCommentForm } = this.props
    const change = { [e.target.name]: e.target.value }

    changeCommentForm(change)
  }

  getBody() {
    const {
      comments = [],
      isOpen,
      comment: { text, author }
    } = this.props
    if (!isOpen) return null

    return (
      <div className="test--comment-list__body">
        <form onChange={this.changeCommentForm} className="comment-form">
          <label>
            Comment Text
            <input defaultValue={text} name="text" />
          </label>
          <label>
            Author
            <input defaultValue={author} name="author" />
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
    comment: state.forms.comment
  }),
  {
    changeCommentForm
  }
)(toggleOpen(CommentList))
