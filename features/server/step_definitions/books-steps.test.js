import {defineFeature, loadFeature} from 'jest-cucumber';
import GetBooksMock from '../../../mocks/get-books.mock'
import fetch from './utils/fetch'
import {SeedModel} from '../../../src/server/db/seeds'

let books
let book
let expectedBook
let deletedBook
let bookEdits
let favoritedBook
let unfavoritedBook
let favorites

beforeAll(function() {
  return SeedModel('Book').then(xhr => console.log('Seeded db with books data'))
})

defineFeature(loadFeature('./features/server/books.feature'), test => {
  const withMockBook = () => {
    const {length}  = GetBooksMock.books
    const i         = Math.floor(Math.random() * length)
    expectedBook    = GetBooksMock.books[i]
    return expectedBook
  }


  // GET /books
  test('Get Books', ({ given, when, and, then }) => {
    
    given('there are books in the database', function () {
      expect(GetBooksMock.books.length).toBeGreaterThan(0)
    })

    when('I fetch the books endpoint', async function () {
      books = []
      await fetch(`/books`).then((json) => {
        books = json.books
      })
    })

    then('the response will contain a list of books', function () {
      expect(books.length).toBeGreaterThan(0)
    })
    
  })
    
  // GET /books/9226
  test('Get a Book', ({ given, when, and, then }) => {

    given('there are books in the database', function () {})

    when('I fetch the book details endpoint', async () => {
      book = undefined
      withMockBook()
      await fetch(`/books/${expectedBook.vendorId}`).then((json) => {
        book = json.book
      })    
    })

    then('the response will contain details about the book', function () {
      expect(book)
      
      '_id','title','author','vendorId'.split(' ').map(k => expect(book).toHaveProperty(k))
    })
  
  })
  
  test('Create a Book', ({ given, when, and, then }) => {
    // POST /books {title:'Eskiboy: Wiley','vendorId':34846939}
    // IMPORTANT: we can't reuse one of the mocks for this step
    given('I have a book with valid attributes', function () {
      expectedBook = {
        author: "Richard Kylea Cowier",
        vendorId: "34846939",
        title: "Eskiboy: Wiley"
      }
    })

    when('I save the book to the database', async () => {
      await fetch(`/books`, {
        method: 'POST',
        body: expectedBook
      })
    })
    
    and('I fetch the books endpoint', async function () {
      books = []
      await fetch(`/books`).then((json) => {
        books = json.books
      })
    })
    
    then('my book will be in the list', async () => {
      books = []
      await fetch(`/books`).then((json) => {
        books = json.books
      })
      const matches = books.filter(b => b.vendorId == expectedBook.vendorId)
      expect(matches).toHaveLength(1)
    })
  })
  
  // DELETE /books/38140077
  test('Delete a Book', ({ given, when, and, then }) => {

    given('there are books in the database', function () {})
  
    and('I have a book I want to delete', function () {
      withMockBook()
      expect(typeof expectedBook.vendorId).toBe('string')
    })

    when('I fetch the delete book endpoint', async () => {
      await fetch(`/books/${expectedBook.vendorId}`, {
        method: 'DELETE'
      }).then((xhr) => {
        expect(xhr.success)
        deletedBook = xhr.book
      })
    })

    and('I fetch the books endpoint', async function () {
      books = []
      await fetch(`/books`).then((json) => {
        books = json.books
      })
    })


    then('my book will not be in the list', function () {
      const matches = books.filter((a) => {
        return a.vendorId == deletedBook.vendorId
      })
      expect(matches).toHaveLength(0)
    })
  
  })
    
  
  // PUT /books/9226
  test('Update a Book', ({ given, when, and, then }) => {
    
    given('there are books in the database', function () {})
      
    when('I fetch the book details endpoint', async () => {
      book = undefined
      withMockBook()
      await fetch(`/books/${expectedBook.vendorId}`).then((json) => {
        book = json.book
      })    
    })
    
    and('I make changes to the book', () => {
      bookEdits = {
        title  : expectedBook.title  + ' _EDIT_',
        author : expectedBook.author + ' _EDIT_'
      }
    })

    when('I send the changes to the book details endpoint', async () => {
      await fetch(`/books/${expectedBook.vendorId}`, {
        method: 'PUT',
        body: {
          title: bookEdits.title,
          author: bookEdits.author
        }
      }).then((xhr) => {
        expect(xhr.success)
      })
    })

    then('the book contains my changes', async () => {
      book = undefined
      await fetch(`/books/${expectedBook.vendorId}`).then((json) => {
        book = json.book
      })

      expect(book).toEqual(expect.objectContaining(bookEdits))
    })
  })

  // PUT /books/9226/favorite
  test('Favorite a Book',  ({ given, when, and, then }) => {
    given('I have a book I would like to favorite', function () {
      favoritedBook = withMockBook()
    })

    when('I visit the favorite book endpoint', async () => {
      book = await fetch(`/books/${favoritedBook.vendorId}/favorite`,{
        method: 'PUT',
      }).then(xhr => xhr.book)
    })

    then('my book will be added to the list of favorites', async () => {
      // in response:
      expect(book.favorite).toBe(true)
      // in full list
      favorites = await fetch(`/books/favorites`).then(xhr => xhr.books)
      const match = favorites.find(b => b.vendorId == favoritedBook.vendorId)
      expect(match)
    })
  })
    
  // PUT /books/9226/unfavorite
  test('Unfavorite a Book',  ({ given, when, and, then }) => {
    given('I have a book I would like to unfavorite', function () {
      unfavoritedBook = withMockBook()
    })

    when('I visit the unfavorite book endpoint', async () => {
      book = await fetch(`/books/${unfavoritedBook.vendorId}/unfavorite`,{
        method: 'PUT',
      }).then(xhr => xhr.book)
    })

    then('my book will be removed from the list of favorites', async () => {
      // in response:
      expect(book.favorite).toBe(false)
      // in full list
      favorites = await fetch(`/books/favorites`).then(xhr => xhr.books)
      const match = favorites.find(b => b.vendorId == unfavoritedBook.vendorId)
      expect(match)
    })
  })


  // GET /books/9226/vendor
  test('Get Related Books',  ({ given, when, and, then }) => {
    let bookId
    given('I have an book\'s vendorId', function () {
      bookId = 13586743 // 'one last thing'
    })

    when('I fetch the get-vendor-book endpoint', async () => {
      book = await fetch(`/books/${bookId}/vendor`).then(xhr => xhr.book)
    })

    then('the response will contain the vendor\'s record for the book', function () {
      ['title','author','vendorId','similar_books'].map(k => expect(book).toHaveProperty(k))
    })

    then('there will be some related books in the response', function () {
      expect(book.similar_books.length).toBeGreaterThan(0)
    })
  })
})