import {createAction} from 'redux-actions'
import axios from 'axios'

// constants
export const GET_AUTHORS       = 'authors/GET_AUTHORS'
export const GET_AUTHOR        = 'authors/GET_AUTHOR'
export const SEARCH_FOR_AUTHOR = 'authors/SEARCH_FOR_AUTHOR'
export const CREATE_AUTHOR     = 'authors/CREATE_AUTHOR'

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

export const createAuthor = function(attrs){
  return {
    type: CREATE_AUTHOR,
    payload: axios.get(`http://localhost:3000/authors`, {
      method: 'POST',
      body: attrs
    })
      .then(xhr => xhr.data)
  }
}


export const searchForAuthor = function({query}){
  const escapedQuery = escape(query)
  console.log(`|redux| searchForAuthor: ${escapedQuery}`)
  console.log(`http://localhost:3000/authors/search?q=${escapedQuery}`)
  return {
    type: SEARCH_FOR_AUTHOR,
    payload: axios.get(`http://localhost:3000/authors/search?q=${escapedQuery}`)
      .then(xhr => xhr.data.author),
    meta: {
      query
    }
  }
}

// reducers
const initialState = {
  loading: false,
  list:[],
  details:{},
  query: undefined,
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
      
    case `${SEARCH_FOR_AUTHOR}_PENDING`:
      return {
        ...state,
        loading:true,
        query: action.meta.query,
        searchResults: []
      }
      
    case `${SEARCH_FOR_AUTHOR}_FULFILLED`:
      return {
        ...state,
        loading:false,
        searchResults: [action.payload]
      }
      
    default:
      return state
  }
}

export default authors