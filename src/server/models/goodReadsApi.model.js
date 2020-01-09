import dotenv from 'dotenv'; 
import fetch from 'isomorphic-fetch'
import {xml2js,xml2json} from 'xml-js'
import getProp from '../utils/path'

const config = dotenv.config().parsed
  
class GoodReadsAPI {
  constructor(){
    const ns          = 'goodreads_'
    this.api_key      = config[`${ns}key`]
    this.user_profile = config[`${ns}user_profile`]
    this.host         = config[`${ns}host`]
    this.api_root     = config[`${ns}api_root`]
    this.base         = `${this.host}${this.api_root}`
  }
  
  search(q){
    return new Promise((resolve,reject) => {

      if(!q) throw new Error('must provide a query')
      const query = encodeURIComponent(q)
      const url  = `${this.base}/author_url/${query}?key=${this.api_key}`
      console.log(`|grapi| connecting to ${url}`)
      fetch(url).then(xhr => {
        if(xhr.status = 200) {
          return xhr.text()
        } else {
          throw new Error('connection erro')
        }
      })
      .then(doc => xml2js(doc, {compact:true}))
      .then(json => this.parseResponse('/api/author_url', json))
      .then(author => resolve(author))
      .catch(e => reject(e))
      
    })
  }
  
  parseResponse(endpoint, json){
    switch(endpoint){
      case '/api/author_url':
        if(!json.GoodreadsResponse || !json.GoodreadsResponse.author) {
          throw new Error('bad json response in parse')
        } 
        
        return this.parseAuthor(getProp(['GoodreadsResponse','author'], json))
        
      default:
        return null
    }
  }

  
  parseAuthor(json) {
    return {
      vendorId  : json._attributes.id,
      name      : json.name._cdata
    }
  }
}

export default new GoodReadsAPI()