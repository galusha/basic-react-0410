import React, { Component } from 'react'
import DateRange from './date-range'
import SelectFilter from './select'
import { connect } from 'react-redux'
import { setFilter } from '../../ac'

class Filters extends Component {
  static propTypes = {}

  render() {
    const { articles, setFilter, dateRange, selected } = this.props

    return (
      <div>
        <SelectFilter
          setFilter={setFilter}
          options={articles || []}
          selected={selected}
        />
        <DateRange setFilter={setFilter} dateRange={dateRange} />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    selected: state.filter.selected,
    dateRange: state.filter.dateRange,
    articles: state.articles
  }),
  { setFilter }
)(Filters)
