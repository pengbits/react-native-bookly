import {createAction} from 'redux-actions'

// constants
export const GET_AUTHORS = 'app/GET_AUTHORS'

// action creators
export const getAuthors = function(){
  return function(dispatch, getState) {
    dispatch({
      type: `${GET_AUTHORS}_PENDING`
    })
    
    setTimeout(function(){
      dispatch({
        type: `${GET_AUTHORS}_FULFILLED`
      })
    }, 250)
  }
}//createAction(GET_AUTHORS)

// reducers
const initialState = {
  loading: false,
  books: [],
  authors:[]
}


export const app = (state=initialState, action={}) => {
  switch(action.type){
    
    case GET_AUTHORS:
      return {
        ...state,
        loading:true
      }
      
    case `${GET_AUTHORS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        authors: ['William Gibson','Tommy Orange','Zadie Smith']
      }
      
    default:
      return state
  }
}

export default app