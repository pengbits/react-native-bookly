import {should,expect} from 'chai'
const assert = require('assert');
const { Before, After, Given, When, Then } = require('cucumber');
import GetAuthors from '../../mocks/get-authors.mock'
import fetch from './utils/fetch'

let authors
let author

Before(() => {
  authors = []
  author  = undefined
})

Given('there are authors in the database', function () {
  expect(GetAuthors.authors).not.to.be.empty
});


// GET /authors/1
When('I fetch the author details endpoint', async () => {
  await fetch(`/authors`).then((xhr) => {
    authors = xhr.authors
  })
})

Then('the response will contain details about the author', function () {
  expect(authors).not.to.be.empty
});

// GET /authors
When('I fetch the authors endpoint', function () {
});

Then('the response will contain a list of authors', function () {
  // Write code here that turns the phrase above into concrete actions
});

