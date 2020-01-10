import fetch from 'isomorphic-fetch'
const host = `http://localhost:3000`

const performFetch = (path=null, opts={}) => {
  if(!path) throw new Error('must provide a path to fetch')
  const url = `${host}${path}`
  
  console.log(`|fetch| ${url}`)
  return fetch(url)
    .then(function(xhr){
      if(xhr.status >= 400){
        throw new Error('Bad response from server')
      }
      return xhr.json()
    })
}

export default performFetch