import React, { Component } from 'react'
import Select from 'react-select'

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
  render() {
    const { lng } = this.props
    console.log('lng', lng)
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

  handleLanguageChange = (selected) => {
    this.props.onChange(selected.value)
  }
}

export default LanguageSelect
