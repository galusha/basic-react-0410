import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from './article'
import accordionDecorator from '../decorators/accordion'

export class ArticleList extends Component {
  render() {
    return <ul>{this.items}</ul>
  }

  static propTypes = {
    articles: PropTypes.array.isRequired,
    openItemId: PropTypes.string,
    toggleOpenItem: PropTypes.func,
    fetchData: PropTypes.func
  }

  get items() {
    const { articles, openItemId, toggleOpenItem } = this.props
    return articles.map((article) => (
      <li key={article.id} className="test--article-list__item">
        <Article
          article={article}
          isOpen={openItemId === article.id}
          toggleOpen={toggleOpenItem}
        />
      </li>
    ))
  }

  componentDidMount() {
    const { fetchData } = this.props
    fetchData && fetchData()
  }
}

const ArticleListWithAccordion = accordionDecorator(ArticleList)

export default ArticleListWithAccordion
