import db from '../db'
import Author from '../models/author.model'
import Book   from '../models/book.model'
import GetAuthorsMock from '../../../mocks/get-authors.mock'
import GetBooksMock   from '../../../mocks/get-books.mock'

export const SeedAuthors = () => {

  console.log('deleting all authors from db...')
  Author.deleteMany({}, function(res){
    res && console.log(res)
  })
  console.log('loading authors into db...')
  const fixtures = GetAuthorsMock.authors.map((author) => {
    // reject reserved attributes
    const {_id,__v, ...attrs} = author
    new Author(attrs).save()
  })

}

export const SeedBooks = () => {

  console.log('deleting all books from db...')
  Book.deleteMany({}, function(res){
    res && console.log(res)
  })
  console.log('loading books into db...')
  const fixtures = GetBooksMock.books.map((author) => {
    const {_id,__v, ...attrs} = author
    new Book(attrs).save()
  })

}