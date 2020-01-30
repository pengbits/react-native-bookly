import fetch from 'isomorphic-fetch'
const host = `http://localhost:3000`

const performFetch = (path=null, opts={}) => {
  if(!path) throw new Error('must provide a path to fetch')
  const url = `${host}${path}`
  
  if(opts.body && /post|POST/.test(opts.method)){
    opts.body = JSON.stringify(opts.body)
    opts.headers = {
      "Content-Type": "application/json"
    },
    opts.credentials=  "same-origin"
  }

  // console.log(`|fetch| ${opts.method || 'GET'} ${url} `)

  return fetch(url, opts)
    .then(function(xhr){
      if(xhr.status >= 400){
        console.log(xhr)
        throw new Error(`${xhr.status} Server Error `)
      }
      return xhr.json()
    })
}

export default performFetch