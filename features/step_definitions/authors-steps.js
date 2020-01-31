import {should,expect} from 'chai'
const assert = require('assert');
const { Before, After, Given, When, Then } = require('cucumber');
import GetAuthorsMock from '../../mocks/get-authors.mock'
import fetch from './utils/fetch'
import {SeedModel} from '../../src/server/db/seeds'

let authors
let author
let expectedAuthor
let deletedAuthor

SeedModel('Author')

  const withMockAuthor = () => {
    const {length}     = GetAuthorsMock.authors
    const i            = Math.floor(Math.random() * length)
    expectedAuthor     = GetAuthorsMock.authors[i]
    return expectedAuthor
  }

    Given('there are authors in the database', function () {
      expect(GetAuthorsMock.authors).not.to.be.empty // not proof of anything really, 
    });

    
    // GET /authors
    When('I fetch the authors endpoint', async () =>  {
      authors = []
      await fetch(`/authors`).then((json) => {
        authors = json.authors
      })
    });

    Then('the response will contain a list of authors', function () {
      expect(authors).not.to.be.empty
    });


    // GET /authors/9226
    When('I fetch the author details endpoint', async () => {
      author = undefined
      withMockAuthor()
      await fetch(`/authors/${expectedAuthor.vendorId}`).then((json) => {
        author = json.author
      })
    })

    Then('the response will contain details about the author', function () {
      expect(author).not.to.be.undefined
      expect(author).to.include.keys('_id','vendorId','name','about')
    });

    // POST /authors {name:'William Gibson','vendorId':9226}
    // IMPORTANT: we can't reuse one of the mocks for this step
    Given('I have an author with valid attributes', function () {
      expectedAuthor = {
        name: "Jonathan Tropper",
        vendorId: "26163",
        about: "Jonathan Tropper is the author of Everything Changes, The Book of Joe , which was a Booksense selection, and Plan B"
      }
    });

    When('I save the author to the database', async () => {
      await fetch(`/authors`, {
        method: 'POST',
        body: {
          name      : expectedAuthor.name, 
          about     : expectedAuthor.about, 
          vendorId  : expectedAuthor.vendorId
        }
      })
    })
     
    Then('my author will be in the list', async () => {
      authors = []
      await fetch(`/authors`).then((json) => {
        authors = json.authors
      })
      const matches = authors.filter(a => a.vendorId == expectedAuthor.vendorId)
      expect(matches.length).to.equal(1)
    })
     
    // DELETE /authors/9226
    Given('I have an author I want to delete', function () {
      withMockAuthor()
      expect(expectedAuthor.vendorId).to.be.a('string')
    });

    When('I fetch the delete author endpoint', async () => {
      await fetch(`/authors/${expectedAuthor.vendorId}`, {
        method: 'DELETE'
      }).then((xhr) => {
        expect(xhr.success)
        deletedAuthor = xhr.author
      })
    });

    // (when i fetch the authors endpoint)

    Then('my author will not be in the list', function () {
      const matches = authors.filter((a) => {
        return a.vendorId == deletedAuthor.vendorId
      })
      expect(matches).to.be.empty
    });
