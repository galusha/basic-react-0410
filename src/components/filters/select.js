import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

class SelectFilter extends Component {
  state = {
    selected: null
  }

  static propTypes = {
    articles: PropTypes.array.isRequired
  }

  handleChange = (selected) => this.setState({ selected })

  get options() {
    return this.props.articles.map((article) => ({
      label: article.title,
      value: article.id
    }))
  }

  render() {
    return (
      <Select
        options={this.options}
        value={this.state.selected}
        onChange={this.handleChange}
        isMulti
      />
    )
  }
}

export default SelectFilter
