import React, { Component } from 'react'

const filterDecorator = (OriginalComponent, listName) =>
  class FilterDecorator extends Component {
    getFilteredList() {
      const list = this.props[listName]
      let filteredList = [...list]

      const { filter } = this.props
      const rangeFilter = filter.dateRange
      const selectFilter = filter.selected

      if (selectFilter && selectFilter.length) {
        filteredList = this.toApplySelectFilter(filteredList, selectFilter)
      }

      if (rangeFilter) {
        filteredList = this.toApplyRangeFilter(filteredList, rangeFilter)
      }

      return filteredList
    }

    toApplySelectFilter(list, selected) {
      return list.filter((item) =>
        selected.find((selectedItem) => selectedItem.value === item.id)
      )
    }

    toApplyRangeFilter(list, rangeFilter) {
      const { from = null, to = null } = rangeFilter

      //convert to ISOString if it's not in the format
      const fromInISO =
        from && typeof from !== 'string' ? from.toISOString() : from
      const toInISO = to && typeof to !== 'string' ? to.toISOString() : to

      if (fromInISO || toInISO) {
        return list.filter((item) => {
          if (!item.date) return false

          //convert to ISOString if it's not in the format
          const itemDateInISO =
            typeof item.date !== 'string' ? item.date.toISOString() : item.date

          if (fromInISO && toInISO) {
            return fromInISO <= itemDateInISO && itemDateInISO <= toInISO
          } else {
            if (fromInISO) {
              return fromInISO <= itemDateInISO
            }
            if (toInISO) {
              return itemDateInISO <= toInISO
            }
          }
        })
      }

      return list
    }

    render() {
      let filteredList = this.getFilteredList()
      return (
        <OriginalComponent {...{ ...this.props, [listName]: filteredList }} />
      )
    }
  }

export default filterDecorator
