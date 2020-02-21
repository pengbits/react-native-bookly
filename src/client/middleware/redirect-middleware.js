import {CREATE_AUTHOR} from '../redux/authors' 
export const RedirectMiddleware = store => next => action => {
  // console.log(action)
  if(typeof action =='object'){
    switch(action.type){
      case `${CREATE_AUTHOR}_FULFILLED`:
        console.log('time for a redirect')
      default:
        return next(action)
    }
  }
}


export default RedirectMiddleware