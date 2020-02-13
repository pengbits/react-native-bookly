import { combineReducers } from 'redux'
import { authors } from './authors'

export const indexReducer = combineReducers({
  authors
})

export default indexReducer