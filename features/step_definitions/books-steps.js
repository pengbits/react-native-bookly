import {should,expect} from 'chai'
const assert = require('assert');
const { Before, After, Given, When, Then } = require('cucumber');
import GetBooksMock from '../../mocks/get-books.mock'
import fetch from './utils/fetch'
// import {SeedAuthors} from '../../src/server/db/seeds'

Given('there are Books in the database', function () {
  return 'pending';
});


When('I fetch the Books endpoint', function () {
  return 'pending';
});

Then('the response will contain a list of Books', function () {
  return 'pending';
});
