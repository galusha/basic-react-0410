import React, { Component } from 'react'
import { Consumer as LanguageConsumer } from '../contexts/language'
const formTranslations = require('../translations/form.json')

class UserForm extends Component {
  render() {
    return (
      <LanguageConsumer>
        {(lng) => (
          <div>
            {formTranslations[lng].username}:{' '}
            <input value={this.props.value} onChange={this.handleUserChange} />
          </div>
        )}
      </LanguageConsumer>
    )
  }

  handleUserChange = (ev) => {
    this.props.onChange(ev.target.value)
  }
}

export default UserForm
