import { Router } from 'express'
import Book from '../models/book.model'

// actions
// ----------------------------------------------------------------------------
const list = async (req,res) => {
  const books = await Book.find({})
  respondWith(res, {books})
} 

const get = async (req,res,next) => {
  const book = await findbook(req.params)
  respondWith(res, {book})
}
// 
// const search = async (req,res,next) => {
//   const book = await GoodReadsAPI.search(req.query.q)
//   respondWith(res, {book})
// }
// 
const create = async (req,res,next) => {
  const book = await new Book(req.body).save()
  respondWith(res, {book})  
}

const update = async (req,res) => {
  const book   = await findbook(req.params)
  const response = await Object.assign(book, req.body).save()
  respondWith(res, {book}) // doesn't include changed attributes
}

const remove = async (req,res) => {
  const book = await findbook(req.params)
  const response = await book.deleteOne({
    vendorId:req.params.id
  })

  respondWith(res, {
    success: response.ok,
    book
  })
}

// helpers
// ----------------------------------------------------------------------------
const findbook = ({id}) => {
  return Book.findOne({vendorId:id})
    .then((book) => {
      if(!book)  throw new Error(`could not find book with id ${id}`)
      return book
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
  create  : dispatch(create),
  remove  : dispatch(remove),
  update  : dispatch(update)

}