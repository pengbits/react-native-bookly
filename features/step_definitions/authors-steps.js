import {should,expect} from 'chai'
const assert = require('assert');
const { Given, When, Then } = require('cucumber');
import GetAuthors from '../../mocks/get-authors.mock'

Given('there are authors in the database', function () {
  expect(GetAuthors.authors).not.to.be.empty
});

When('I fetch the author details', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the response will contain some information about the author', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

