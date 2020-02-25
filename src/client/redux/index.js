import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { authors } from './authors'
import { navigator } from './navigator'

export const indexReducer = combineReducers({
  authors,
  navigator,
  form
})

export default indexReducer