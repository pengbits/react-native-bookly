import {createAction} from 'redux-actions'
import axios from 'axios'

// constants
export const GET_AUTHORS = 'app/GET_AUTHORS'

// action creators
export const getAuthors = function(){
  return {
    type    : GET_AUTHORS,
    payload : axios.get('http://localhost:3000/authors')
      .then(xhr => xhr.data.authors)
  }
}


// reducers
const initialState = {
  loading: false,
  books: [],
  authors:[]
}


export const app = (state=initialState, action={}) => {
  switch(action.type){
    
    case `${GET_AUTHORS}_PENDING`:
      return {
        ...state,
        loading:true
      }
      
    case `${GET_AUTHORS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        authors: action.payload.slice(0)
      }
      
    default:
      return state
  }
}

export default app