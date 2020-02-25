import queryString from 'querystring'
import fetch from 'isomorphic-fetch'
const host = `http://localhost:3000`
let url

const performFetch = (path=null, opts={}) => {
  if(!path) throw new Error('must provide a path to fetch')
    url = `${host}${path}`
  
  if(opts.body && /post|put/.test(opts.method.toLowerCase())){
    opts.body = JSON.stringify(opts.body)
    opts.headers = {
      "Content-Type": "application/json"
    },
    opts.credentials=  "same-origin"
  }

  if(opts.params){
    url += ('?' + queryString.encode(opts.params))
  }

  // console.log(`|fetch| ${opts.method || 'GET'} ${url} `)
  
  return fetch(url, opts)
    .then(function(xhr){
      if(xhr.status >= 400){  
        throw new Error(`${xhr.status} Server Error `)
      }
      return xhr.json()
    })
}

export default performFetch