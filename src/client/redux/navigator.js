import {createAction} from 'redux-actions'

export const NAVIGATE_TO_VIEW = `navigator/NAVIGATE_TO_VIEW`;  

export const navigateToView   = createAction(NAVIGATE_TO_VIEW)

const initialState = {
  pending: false,
  view: undefined,
  wibble:true
}

export const navigator = (state=initialState, action={}) => {
  switch(action.type){
    
    case NAVIGATE_TO_VIEW:
      return {
        ...state,
        pending: true,
        view: action.payload
      }
    
    case `${NAVIGATE_TO_VIEW}_FULFILLED`:
      return {
        ...state,
        pending: false,
        view: undefined
      }
      
    default: 
      return state
  }
}

export default navigator