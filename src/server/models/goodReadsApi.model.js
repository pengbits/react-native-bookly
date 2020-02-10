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
    this.base         = `${this.host}`
  }
  
  search(q){
    return new Promise((resolve,reject) => {

      if(!q) throw new Error('must provide a query')
      const query = encodeURIComponent(q)
      const url  = `${this.base}/api/author_url/${query}?key=${this.api_key}`
      console.log(`|grapi| connecting to ${url}`)
      fetch(url).then(xhr => {
        if(xhr.status = 200) {
          return xhr.text()
        } else {
          throw new Error('connection error')
        }
      })
      .then(doc => xml2js(doc, {compact:true}))
      // .then(json => {console.log(json); return json})
      .then(json => this.parseResponse('/api/author_url', json))
      .then(author => resolve(author))
      .catch(e => reject(e))
      
    })
  }
  
  showAuthor({id}){
    return new Promise((resolve,reject) => {
      const url  = `${this.base}/author/show/${id}?format=xml&key=${this.api_key}`
      console.log(`|grapi| connecting to ${url}`)
      fetch(url).then(xhr => {
        if(xhr.status = 200) {
          return xhr.text()
        } else {
          throw new Error('connection error')
        }
      })
      .then(doc => xml2js(doc, {compact:true})) 
      // .then(json => {console.log(json); return json})
      .then(json => this.parseResponse('/author/show', json))
      .then(author => resolve(author))
      .catch(e => reject(e))
    })
  }
  
  parseResponse(endpoint, json){
    let method
    switch(endpoint){
      
      case '/api/author_url':
      case '/author/show':
        const authorJson = this.extractAuthorJson(json)
        return this.parseAuthor(authorJson, (endpoint=='/api/author_url' ? 'search':'show'))

      default:
        return null
    }
  }

  
  parseAuthor(json, method) {
    return method == 'search' ? {
      name:       json.name._cdata,
      vendorId:   json._attributes.id
    } : {
      name:       json.name._text,
      vendorId:   json.id._text
    }
  }

  extractAuthorJson(json){
    if(!json.GoodreadsResponse || !json.GoodreadsResponse.author){
      throw new Error('bad json response')
    }
    return json.GoodreadsResponse.author
  }
}

export default new GoodReadsAPI()