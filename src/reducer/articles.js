import { normalizedArticles } from '../fixtures'
import { DELETE_ARTICLE, ADD_NEW_COMMENT } from '../constants'

const defaultArticles = new Map()

normalizedArticles.forEach((article) =>
  defaultArticles.set(article.id, article)
)

export default (articlesState = defaultArticles, action) => {
  const { type, payload } = action

  switch (type) {
    case DELETE_ARTICLE:
      articlesState.delete(payload.id)
      return new Map(articlesState)

    case ADD_NEW_COMMENT:
      const { comment, articleId } = payload
      const commentId = comment.id
      const articles = new Map(articlesState)
      const article = articles.get(articleId)

      article.comments.push(commentId)
      articles.set(articleId, article)
      return articles
    default:
      return articlesState
  }
}
