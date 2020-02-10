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
      .then(doc    => xml2js(doc, {compact:true}))
      .then(json   => this.extractAuthorJson(json))
      .then(json   => this.parseAuthor(json, 'search'))
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
      .then(doc    => xml2js(doc, {compact:true})) 
      .then(json   => this.extractAuthorJson(json))
      .then(json   => this.parseAuthor(json, 'show_author'))
      .then(author => resolve(author))
      .catch(e => reject(e))
    })
  }

  
  parseAuthor(json, method) {
    if (method == 'search') return {
      name      : json.name._cdata,
      vendorId  : json._attributes.id,
      link      : json.link._text
    }
    
    if( method == 'show_author') return {
      name      : json.name._text,
      vendorId  : json.id._text,
      link      : json.link._cdata,
      image     : json.large_image_url._cdata,
      about     : json.about._cdata
    }
    
    return {}
  }

  extractAuthorJson(json){
    const author = getProp(['GoodreadsResponse','author'], json)
    if(!author) throw new Error('bad json response')

    return author
  }
}

export default new GoodReadsAPI()