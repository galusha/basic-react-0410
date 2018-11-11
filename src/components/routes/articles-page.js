import React, { Component, Fragment } from 'react'
import { Consumer as LanguageConsumer } from '../../contexts/language'
import ArticleList from '../article-list'
import { Route } from 'react-router-dom'
import Article from '../article'
const articleTranslations = require('../../translations/article.json')

class ArticlesPage extends Component {
  static propTypes = {}

  render() {
    console.log('---', 'articles-page match: ', this.props.match)
    //      const title = this.props.match.isExact && <h1>Select an Article</h1>
    console.log('---', 1)
    return (
      <Fragment>
        <ArticleList />
        <Route path="/articles/:id" children={this.getArticle} />
      </Fragment>
    )
  }

  getArticle = ({ match }) => {
    console.log('---', 'article match: ', match)

    if (!match)
      return (
        <LanguageConsumer>
          {(lng) => <h1>{articleTranslations[lng].empty}</h1>}
        </LanguageConsumer>
      )

    const { id } = match.params
    return <Article id={id} key={id} isOpen />
  }
}

export default ArticlesPage
