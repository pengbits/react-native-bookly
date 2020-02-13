import {createAction} from 'redux-actions'

// constants
export const GET_AUTHORS = 'app/GET_AUTHORS'

// action creators
export const getAuthors = function(){
  return {
    type:     GET_AUTHORS,
    payload:  new Promise((resolve,reject) => {
      setTimeout(resolve, 0, {
        success: true,
        data: ['William Gibson','Tommy Orange','Zadie Smith']
      })
    }).then(xhr => xhr.data)
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
    
    case GET_AUTHORS:
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