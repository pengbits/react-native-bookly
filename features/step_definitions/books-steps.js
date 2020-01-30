import {should,expect} from 'chai'
const assert = require('assert');
const { Before, After, Given, When, Then } = require('cucumber');
import GetBooksMock from '../../mocks/get-books.mock'
import fetch from './utils/fetch'
// import {SeedAuthors} from '../../src/server/db/seeds'

let books


Given('there are Books in the database', function () {
  books = []
  expect(GetBooksMock.books).not.to.be.empty
});

When('I fetch the Books endpoint', async function () {
  await fetch(`/books`).then((json) => {
    books = json.books
  })
});

Then('the response will contain a list of Books', function () {
  expect(books).not.to.be.empty
});
