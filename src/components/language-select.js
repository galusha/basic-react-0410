import React, { Component } from 'react'
import Select from 'react-select'
import { withRouter, matchPath } from 'react-router-dom'
import { replace, push } from 'connected-react-router'

const languages = {
  en: {
    en: 'English',
    ru: 'Russian'
  },
  ru: {
    en: 'Английский',
    ru: 'Русский'
  }
}

class LanguageSelect extends Component {
  componentDidMount = (props) => {
    const { onChange, history, location } = this.props

    const lng = this.toGetLngFromUrl()

    if (lng) {
      if (languages[lng]) {
        onChange(lng)
      } else {
        //Why does not it (replace from 'connected-react-router') work??
        //replace(location.pathname.replace(new RegExp(lng), 'en'))

        history.replace(location.pathname.replace(new RegExp(lng), 'en'))
      }
    }
  }

  handleLanguageChange = (selected) => {
    const { onChange, history, location } = this.props
    onChange(selected.value)

    const lng = this.toGetLngFromUrl()

    if (lng && lng !== selected.value) {
      history.replace(
        location.pathname.replace(new RegExp(lng), selected.value)
      )
    }
  }

  toGetLngFromUrl = () => {
    const { location } = this.props

    const parsedParam = matchPath(location.pathname, {
      path: '/:lng/'
    })

    return parsedParam.params.lng
  }

  render() {
    const { lng } = this.props
    return (
      <div>
        {languages[lng][lng]}
        <Select
          options={Object.keys(languages[lng]).map((key) => ({
            label: languages[lng][key],
            value: key
          }))}
          value={{ value: lng, label: languages[lng][lng] }}
          onChange={this.handleLanguageChange}
        />
      </div>
    )
  }
}

export default withRouter(LanguageSelect)
