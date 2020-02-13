import { Router } from 'express'
import Book from '../models/book.model'
import GoodReadsAPI from '../models/goodreadsApi.model'
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
  const book  = await findbook(req.params)
  const response = await Object.assign(book, req.body).save()
  respondWith(res, {book}) // return changed model optimistically
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


const getFromVendor = async(req,res) => {
  const {id} = req.params
  const book = await GoodReadsAPI.showBook({id})
  respondWith(res, {book})
}

// GET /books/favorites 
const favorites = async(req,res) => {
  const books = await Book.find({favorite:true})
  console.log('found '+books.length +' favorites')
  respondWith(res, {books})
}

// PUT books/98787/favorite
const favorite = async(req,res) => {
  const favorited = await setIsFavorite(req, {favorite:true})
  respondWith(res, {book:favorited})
}

// PUT books/98787/unfavorite
const unfavorite = async(req,res) => {
  const unfavorited = await setIsFavorite(req, {favorite:false})
  respondWith(res, {book:unfavorited})
}

const setIsFavorite = async(req,attrs) => {
  const book = await findbook(req.params)
  const response = await Object.assign(book, attrs).save()
  return book
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
  list        : dispatch(list),
  get         : dispatch(get),
  create      : dispatch(create),
  remove      : dispatch(remove),
  update      : dispatch(update),
  favorites   : dispatch(favorites),
  favorite    : dispatch(favorite),
  unfavorite  : dispatch(unfavorite),
  getFromVendor : dispatch(getFromVendor)
}