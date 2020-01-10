import {should,expect} from 'chai'
const assert = require('assert');
const { Before, After, Given, When, Then } = require('cucumber');
import GetAuthors from '../../mocks/get-authors.mock'
import fetch from './utils/fetch'

let authors
let author
let expectedAuthor

Before(() => {
  authors = []
  author  = undefined
  expectedAuthor = undefined
})

Given('there are authors in the database', function () {
  expect(GetAuthors.authors).not.to.be.empty
});


// GET /authors/1
When('I fetch the author details endpoint', async () => {
  const {length} = GetAuthors.authors
  const i = Math.floor(Math.random() * length)
  expectedAuthor = GetAuthors.authors[i]
  await fetch(`/authors/${expectedAuthor.vendorId}`).then((json) => {
    author = json.author
  })
})

Then('the response will contain details about the author', function () {
  expect(author).not.to.be.undefined
  expect(author.name).to.equal(expectedAuthor.name)
  expect(author.id).to.equal(expectedAuthor.id)
});

// GET /authors
When('I fetch the authors endpoint', async () =>  {
});

Then('the response will contain a list of authors', function () {
  // Write code here that turns the phrase above into concrete actions
});

