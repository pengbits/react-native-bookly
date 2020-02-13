import {createAction} from 'redux-actions'

// constants
export const GET_AUTHORS = 'app/GET_AUTHORS'

// action creators
export const getAuthors = createAction(GET_AUTHORS)

// reducers
const initialState = {
  loading: false,
  books: [],
  authors: []
}


export const app = (state={}, action={}) => {
  switch(action.type){
    
    case GET_AUTHORS:
      return {
        ...state,
        loading:true
      }
      
    default:
      return state
  }
}

export default app