import { createSelector } from 'reselect'

export const selectionSelector = (state) => state.filters.selected
export const dateRangeSelector = (state) => state.filters.dateRange
export const articlesLoadingSelector = (state) => state.articles.loading
export const articlesLoadedSelector = (state) => state.articles.loaded
export const articlesMapSelector = (state) => state.articles.entities
export const articleListSelector = createSelector(
  articlesMapSelector,
  (articlesMap) => articlesMap.valueSeq().toArray()
)

export const commentsSelector = (state) => state.comments.entities
export const commentsCountSelector = (state) => state.comments.pagination.count
export const idSelector = (_, props) => props.id
export const commentsCurrentPageSelector = (state) =>
  state.comments.pagination.currentPage
export const commentsStepSelector = (state) => state.comments.pagination.step

export const pagesStateSelector = (state) =>
  state.comments.pagination.pagesState

export const pageStateSelector = createSelector(
  pagesStateSelector,
  commentsCurrentPageSelector,
  (pageStates, currentPage) => pageStates.get(currentPage)
)

export const commentsByPageSelector = createSelector(
  pageStateSelector,
  (pageState) => pageState && pageState.get('commentIds')
)

export const loadingByPageSelector = createSelector(
  pageStateSelector,
  (pageState) => pageState && pageState.get('loading')
)

export const loadedByPageSelector = createSelector(
  pageStateSelector,
  (pageState) => pageState && pageState.get('loaded')
)

export const filtratedArticlesSelector = createSelector(
  selectionSelector,
  dateRangeSelector,
  articleListSelector,
  (selected, dateRange, articles) => {
    const { from, to } = dateRange

    return articles.filter((article) => {
      const published = Date.parse(article.date)
      return (
        (!selected.length ||
          selected.find((selected) => selected.value === article.id)) &&
        (!from || !to || (published > from && published < to))
      )
    })
  }
)

export const createCommentSelector = () =>
  createSelector(commentsSelector, idSelector, (comments, id) => {
    return comments.get(id)
  })

export const articleSelector = createSelector(
  articlesMapSelector,
  idSelector,
  (articles, id) => articles.get(id)
)
