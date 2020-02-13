const initialState = {
  loading: false,
  books: [],
  authors: []
}

export const app = (state={}, action={}) => {
  switch(action.type){
    case 'GET_AUTHORS':
      return {
        ...state,
        loading:true
      }
      
    default:
      return state
  }
}

export default app