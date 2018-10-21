import { SET_FILTER } from '../constants'

export default (
  filterState = { selected: null, dateRange: { from: null, to: null } },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case SET_FILTER:
      return { ...filterState, ...payload }

    default:
      return filterState
  }
}
