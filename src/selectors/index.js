import { createSelector } from 'reselect'

export const selectionSelector = (state) => state.filters.selected
export const dateRangeSelector = (state) => state.filters.dateRange
export const articlesLoadingSelector = (state) => state.articles.loading
export const articlesMapSelector = (state) => state.articles.entities
export const articleListSelector = createSelector(
  articlesMapSelector,
  (articlesMap) => {
    console.log(
      '!!!!!articlesMap.valueSeq().toArray()',
      articlesMap.valueSeq().toArray()
    )
    return articlesMap.valueSeq().toArray()
  }
)

export const commentsSelector = (state) => state.comments.entities.toObject()

export const idSelector = (_, props) => props.id

export const filtratedArticlesSelector = createSelector(
  selectionSelector,
  dateRangeSelector,
  articleListSelector,
  (selected, dateRange, articles) => {
    console.log('---', 'article list selector', articles)
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
    //console.log('selectoer', id, 'comments', comments)
    // return comments.get(id)
    return comments[id]
  })
