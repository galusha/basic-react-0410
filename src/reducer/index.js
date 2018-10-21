import { combineReducers } from 'redux'
import counterReducer from './couter'
import articles from './articles'
import filter from './filter'

export default combineReducers({
  counter: counterReducer,
  articles,
  filter
})
