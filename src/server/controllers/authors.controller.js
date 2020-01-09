import { Router } from 'express'
import Author from '../models/author.model'
import GoodReadsAPI from '../models/goodReadsApi.model'

// actions
// ----------------------------------------------------------------------------
const list = async (req,res) => {
  const authors = await Author.find({})
  respondWith(res, {authors})
} 

const get = async (req,res,next) => {
  const author = await findAuthor(req.params)
  respondWith(res, {author})
}

const search = async (req,res,next) => {
  const author = await GoodReadsAPI.search(req.query.q)
  respondWith(res, {author})
}

/*
const create = async (req,res,next) => {
  const author = await new Author(req.body).save()
  respondWith(res, {author})  
}*/

const update = async (req,res) => {
  const author   = await findAuthor(req.params)
  console.log(req.body)
  const response = await Object.assign(author, req.body).save()
  respondWith(res, {author})
}
/*
const remove = async (req,res) => {
  const author   = await findAuthor(req.params)
  const response = await Author.deleteOne({
    vendorId:req.params.id
  })

  respondWith(res, {
    success: response.ok,
    author
  })
}
*/

// helpers
// ----------------------------------------------------------------------------
const findAuthor = ({id}) => {
  return Author.findOne({vendorId:id})
    .then((author) => {
      if(!author)  throw new Error(`could not find author with id ${id}`)
      return author
    })  
}

const respondWith = (res, payload) => {
  res.status(200)
  .json({
    success:true, 
    ...payload
  })
}

const dispatch = (method) => (res,req,next) => {
  method(res,req).catch(e => {
    console.log('error!')
    next(e)
  })
}

export default {
  list    : dispatch(list),
  get     : dispatch(get),
  search  : dispatch(search),
  update  : dispatch(update)
  //,
  // create  : dispatch(create),
  // remove  : dispatch(remove)
}