import {should,expect} from 'chai'
const assert = require('assert');
const { Before, After, Given, When, Then } = require('cucumber');
import GetBooksMock from '../../mocks/get-books.mock'
import fetch from './utils/fetch'
import {SeedModel} from '../../src/server/db/seeds'

let books
let book
let expectedBook
let deletedBook

SeedModel('Book')

  const withMockBook = () => {
    const {length}  = GetBooksMock.books
    const i         = Math.floor(Math.random() * length)
    expectedBook    = GetBooksMock.books[i]
    return expectedBook
  }

  Given('there are books in the database', function () {
    expect(GetBooksMock.books).not.to.be.empty
  });


  // GET /books
  When('I fetch the books endpoint', async function () {
    books = []
    await fetch(`/books`).then((json) => {
      books = json.books
    })
  });

  Then('the response will contain a list of books', function () {
    expect(books).not.to.be.empty
  });
  
  
  // GET /books/9226
  When('I fetch the book details endpoint', async () => {
    book = undefined
    withMockBook()
    await fetch(`/books/${expectedBook.vendorId}`).then((json) => {
      book = json.book
    })    
  })

  Then('the response will contain details about the book', function () {
    expect(book).not.to.be.undefined
    expect(book).to.include.keys('_id','title','author','vendorId')
  });
  
  // POST /books {title:'Eskiboy: Wiley','vendorId':34846939}
  // IMPORTANT: we can't reuse one of the mocks for this step
  Given('I have a book with valid attributes', function () {
    expectedBook = {
      author: "Richard Kylea Cowier",
      vendorId: "34846939",
      title: "Eskiboy: Wiley"
    }
  });

  When('I save the book to the database', async () => {
    await fetch(`/books`, {
      method: 'POST',
      body: expectedBook
    })
  })
   
  Then('my book will be in the list', async () => {
    books = []
    await fetch(`/books`).then((json) => {
      books = json.books
    })
    const matches = books.filter(b => b.vendorId == expectedBook.vendorId)
    expect(matches.length).to.equal(1)
  })
  
  // DELETE /books/38140077
  Given('I have a book I want to delete', function () {
    withMockBook()
    expect(expectedBook.vendorId).to.be.a('string')
  });

  When('I fetch the delete book endpoint', async () => {
    await fetch(`/books/${expectedBook.vendorId}`, {
      method: 'DELETE'
    }).then((xhr) => {
      expect(xhr.success)
      deletedBook = xhr.book
    })
  });

  // (when i fetch the books endpoint)

  Then('my book will not be in the list', function () {
    const matches = books.filter((a) => {
      return a.vendorId == deletedBook.vendorId
    })
    expect(matches).to.be.empty
  });