import React, { Component } from 'react'
import Select from 'react-select'

class SelectFilter extends Component {
  handleChange = (selected) => {
    const { setFilter } = this.props
    setFilter({ selected })
  }

  get options() {
    const { options } = this.props
    return options.map((article) => ({
      label: article.title,
      value: article.id
    }))
  }

  render() {
    const { selected } = this.props
    return (
      <Select
        options={this.options}
        value={selected}
        onChange={this.handleChange}
        isMulti
      />
    )
  }
}

export default SelectFilter
