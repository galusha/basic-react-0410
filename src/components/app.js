import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ArticlesPage from './routes/articles-page'
import UserForm from './user-form'
import Filters from './filters'
import Counter from './counter'
import CommentsPage from './routes/comments-page'
import Menu, { MenuItem } from './menu'
import { Provider as UserProvider } from '../contexts/user'
import { Provider as LanguageProvider } from '../contexts/language'
import LanguageSelect from './language-select'
const errorTranslations = require('../translations/error.json')

class App extends Component {
  state = {
    user: 'roma',
    lng: 'en'
  }

  setUser = (user) => this.setState({ user })
  setLanguage = (lng) => this.setState({ lng })

  render() {
    return (
      <UserProvider value={this.state.user}>
        <div>
          <LanguageSelect lng={this.state.lng} onChange={this.setLanguage} />
          <LanguageProvider value={this.state.lng}>
            <Menu>
              <MenuItem link="/articles" children="articles" />
              <MenuItem link="/filters">filters</MenuItem>
              <MenuItem link="/counter">counter</MenuItem>
              <MenuItem link="/comments">comments</MenuItem>
            </Menu>
            <UserForm value={this.state.user} onChange={this.setUser} />

            <Switch>
              <Redirect from="/" exact to="/articles" />
              <Route path="/counter" component={Counter} exact />
              <Route path="/comments" component={CommentsPage} />
              <Route path="/filters" component={Filters} />
              <Route
                path="/articles/new"
                render={() => <h1>New Article Page</h1>}
              />
              <Route path="/articles" component={ArticlesPage} />
              <Route path="/error" render={() => <h1>Error Page</h1>} />
              <Route
                path="*"
                render={() => (
                  <h1>{errorTranslations[this.state.lng].notFoundPage}</h1>
                )}
              />
            </Switch>
          </LanguageProvider>
        </div>
      </UserProvider>
    )
  }
}

export default App
