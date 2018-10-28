import { normalizedArticles } from '../fixtures'
import { DELETE_ARTICLE } from '../constants'

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

    default:
      return articlesState
  }
}
