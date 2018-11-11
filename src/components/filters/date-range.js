import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import MomentLocaleUtils from 'react-day-picker/moment'
import 'moment/locale/ru'
import { connect } from 'react-redux'
import { changeDateRange } from '../../ac'
import { Consumer as LanguageConsumer } from '../../contexts/language'

import 'react-day-picker/lib/style.css'
import { dateRangeSelector } from '../../selectors'

class DateRange extends Component {
  handleDayClick = (day) => {
    const { changeDateRange, range } = this.props
    changeDateRange(DateUtils.addDayToRange(day, range))
  }

  render() {
    const { from, to } = this.props.range
    const selectedRange =
      from && to && `${from.toDateString()} - ${to.toDateString()}`
    return (
      <div className="date-range">
        <LanguageConsumer>
          {(lng) => (
            <DayPicker
              localeUtils={MomentLocaleUtils}
              locale={lng}
              selectedDays={(day) => DateUtils.isDayInRange(day, { from, to })}
              onDayClick={this.handleDayClick}
            />
          )}
        </LanguageConsumer>
        {selectedRange}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    range: dateRangeSelector(state)
  }),
  { changeDateRange }
)(DateRange)
