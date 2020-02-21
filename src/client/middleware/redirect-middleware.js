import { CREATE_AUTHOR  } from '../redux/authors' 
// import { navigateToView } from '../redux/navigator'

export const RedirectMiddleware = store => next => action => {
  // console.log(action)
  if(typeof action =='object'){
    switch(action.type){

      // case `${CREATE_AUTHOR}_FULFILLED`:
        
        // return store.dispatch(navigateToView('AuthorList'))
        
      default:
        return next(action)
    }
  }
}


export default RedirectMiddleware