import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { authors } from './authors'

export const indexReducer = combineReducers({
  authors,
  form
})

export default indexReducer