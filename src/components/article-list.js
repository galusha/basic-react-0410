import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  articlesLoadedSelector,
  articlesLoadingSelector,
  filtratedArticlesSelector
} from '../selectors'
import { loadAllArticles } from '../ac'
import Loader from './common/loader'
import { NavLink, withRouter } from 'react-router-dom'
import { Consumer as LanguageConsumer } from '../contexts/language'

export class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    fetchData: PropTypes.func
  }

  render() {
    console.log('---', 2)
    if (this.props.loading) return <Loader />
    return <ul>{this.items}</ul>
  }

  get items() {
    const { articles } = this.props
    return articles.map((article) => (
      <li key={article.id} className="test--article-list__item">
        <LanguageConsumer>
          {(lng) => (
            <NavLink
              to={`/${lng}/articles/${article.id}`}
              activeStyle={{ color: 'red' }}
            >
              {article.title}
            </NavLink>
          )}
        </LanguageConsumer>
      </li>
    ))
  }

  componentDidMount() {
    const { fetchData, loaded, loading } = this.props
    fetchData && !loading && !loaded && fetchData()
  }
}

export default withRouter(
  connect(
    (state) => {
      return {
        articles: filtratedArticlesSelector(state),
        loading: articlesLoadingSelector(state),
        loaded: articlesLoadedSelector(state)
      }
    },
    { fetchData: loadAllArticles }
    /*
    null,
  { pure: false }
*/
  )(ArticleList)
)
