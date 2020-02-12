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
  
  showBook({id}) {
    return new Promise((resolve,reject) => {
      const url  = `${this.base}/book/show/${id}?format=xml&key=${this.api_key}`
      console.log(`|grapi| connecting to ${url}`)
      fetch(url).then(xhr => {
        if(xhr.status = 200) {
          return xhr.text()
        } else {
          throw new Error('connection error')
        }
      })
      .then(doc    => xml2js(doc, {compact:true})) 
      .then(json   => this.extractBookJson(json))
      .then(json   => this.parseBook(json, 'show_book'))
      .then(author => resolve(author))
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

  parseBook(json, method){
    return {
      title  : json.title._text,
      vendorId : json.id._text,
      author : {
        name      : getProp(['authors','author','name','_text'], json),
        vendorId  : getProp(['authors','author','id',  '_text'], json)
      },
      image: json.image_url._text || json.image_url._cdata,
      similar_books :  (getProp(['similar_books','book'], json) || []).map(b => {
        return {
          title     : b.title._text || b.title._cdata,
          vendorId  : b.id._text,
          image     : b.image_url._cdata
        }
      })
    }
  }

  extractAuthorJson(json){
    const author = getProp(['GoodreadsResponse','author'], json)
    if(!author) throw new Error('bad json response')

    return author
  }
  
  extractBookJson(json){
    const book = getProp(['GoodreadsResponse','book'], json)
    if(!book) throw new Error('bad json response')


    return book
  }
}

export default new GoodReadsAPI()