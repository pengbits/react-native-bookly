import {should,expect} from 'chai'
const assert = require('assert');
const { Before, After, Given, When, Then } = require('cucumber');
import GetBooksMock from '../../mocks/get-books.mock'
import fetch from './utils/fetch'
import {SeedBooks} from '../../src/server/db/seeds'

let books
let book
let expectedBook
SeedBooks()

  const withMockBook = () => {
    const {length}  = GetBooksMock.books
    const i         = Math.floor(Math.random() * length)
    expectedBook    = GetBooksMock.books[i]
    return expectedBook
  }

  Given('there are books in the database', function () {
    books = []
    expect(GetBooksMock.books).not.to.be.empty
  });


  // GET /books
  When('I fetch the books endpoint', async function () {
    await fetch(`/books`).then((json) => {
      books = json.books
    })
  });

  Then('the response will contain a list of books', function () {
    expect(books).not.to.be.empty
  });
  
  
  // GET /books/9226
  When('I fetch the book details endpoint', async () => {
    withMockBook()
    await fetch(`/books/${expectedBook.vendorId}`).then((json) => {
      book = json.book
    })
    
  })

  Then('the response will contain details about the book', function () {
    expect(book).not.to.be.undefined
    expect(book).to.include.keys('_id','title','author','vendorId')
  });