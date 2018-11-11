import React, { Component } from 'react'
import MenuItem from './menu-item'
import { Consumer as LanguageConsumer } from '../../contexts/language'
const menuTranslations = require('../../translations/menu.json')

class Menu extends Component {
  static propTypes = {}

  render() {
    return (
      <LanguageConsumer>
        {(lng) => (
          <div>
            <h2>{menuTranslations[lng].menu}</h2>
            <nav>{this.props.children}</nav>
          </div>
        )}
      </LanguageConsumer>
    )
  }
}

export { MenuItem }
export default Menu
