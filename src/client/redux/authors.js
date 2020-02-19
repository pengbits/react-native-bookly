import {createAction} from 'redux-actions'
import axios from 'axios'

// constants
export const GET_AUTHORS = 'authors/GET_AUTHORS'
export const GET_AUTHOR  = 'authors/GET_AUTHOR'
export const SEARCH_FOR_AUTHOR = 'authors/SEARCH_FOR_AUTHOR'

// action creators
export const getAuthors = function(){
  return {
    type    : GET_AUTHORS,
    payload : axios.get('http://localhost:3000/authors')
      .then(xhr => xhr.data.authors)
  }
}

export const getAuthor = function({vendorId}){
  return {
    type    : GET_AUTHOR,
    payload : axios.get(`http://localhost:3000/authors/${vendorId}`)
      .then(xhr => xhr.data.author)
  }
}


export const searchForAuthor = function(query){
  return {
    type: SEARCH_FOR_AUTHOR,
    payload: new Promise((resolve,reject) => {
      setTimeout(resolve, 125, {
        name: 'Billy',
        vendorId: 999999
      })
    })
  }
}

// reducers
const initialState = {
  loading: false,
  list:[],
  details:{},
  searchResults: []
}


export const authors = (state=initialState, action={}) => {
  switch(action.type){
    
    case `${GET_AUTHOR}_PENDING`:
    case `${GET_AUTHORS}_PENDING`:
      return {
        ...state,
        loading:true
      }
      
    case `${GET_AUTHORS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        list: action.payload.slice(0)
      }
      
    case `${GET_AUTHOR}_FULFILLED`:
      return {
        ...state,
        loading:false,
        details: {...action.payload}
      }
      
    default:
      return state
  }
}

export default authors