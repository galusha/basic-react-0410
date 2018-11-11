import React from 'react'
import CommentsPagination from '../comments-pagination'
import { Route, Redirect } from 'react-router-dom'
import { Consumer as LanguageConsumer } from '../../contexts/language'

function CommentsPage({ match }) {
  return match.isExact ? (
    <LanguageConsumer>
      {(lng) => <Redirect to={`/${lng}/comments/1`} />}
    </LanguageConsumer>
  ) : (
    <Route path="/:lng/comments/:page" render={getCommentsPaginator} />
  )
}

function getCommentsPaginator({ match }) {
  return <CommentsPagination page={match.params.page} />
}

CommentsPage.propTypes = {}

export default CommentsPage
