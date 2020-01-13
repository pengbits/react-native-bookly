import {should,expect} from 'chai'
const assert = require('assert');
const { Before, After, Given, When, Then } = require('cucumber');
import GetAuthors from '../../mocks/get-authors.mock'
import fetch from './utils/fetch'

let authors
let author
let expectedAuthor
let deletedAuthor

Before(() => {
  authors = []
  author  = undefined
  expectedAuthor = undefined
  deletedAuthor = undefined
  console.log('Before')
})

After(() => {
  console.log('After')
})

const withMockAuthor = () => {
  const {length}     = GetAuthors.authors
  const i            = Math.floor(Math.random() * length)
  expectedAuthor     = GetAuthors.authors[i]
  return expectedAuthor
}

  Given('there are authors in the database', function () {
    expect(GetAuthors.authors).not.to.be.empty
  });


  // GET /authors/9226
  When('I fetch the author details endpoint', async () => {
    withMockAuthor()
    await fetch(`/authors/${expectedAuthor.vendorId}`).then((json) => {
      author = json.author
    })
  })

  Then('the response will contain details about the author', function () {
    expect(author).not.to.be.undefined
    expect(author).to.include.keys('_id','vendorId','name','about')
  });

  // GET /authors
  When('I fetch the authors endpoint', async () =>  {
    await fetch(`/authors`).then((json) => {
      authors = json.authors
    })
  });

  Then('the response will contain a list of authors', function () {
    expect(authors).not.to.be.empty
  });


  // POST /authors {name:'William Gibson','vendorId':9226}
  Given('I have an author with valid attributes', function () {
    expectedAuthor = withMockAuthor()
  });

  When('I save it to the database', async () => {
    const {name,vendorId,about} = expectedAuthor
    await fetch(`/authors`, {
      method: 'POST',
      body: {name,vendorId,about}
    })
  })
   
  Then('my author will be in the list', async () => {
    await fetch(`/authors`).then((json) => {
      authors = json.authors
    })
    const matches = authors.filter(a => a.vendorId == expectedAuthor.vendorId)
    expect(matches).not.to.be.empty
    console.log(`${matches.length} matches`)
  })
   
  // DELETE /authors/9226
  Given('I have an author I want to delete', function () {
    author = withMockAuthor()
    expect(author.vendorId).to.be.a('string')
  });

  When('I fetch the delete author endpoint', async () => {
    await fetch(`/authors/${author.vendorId}`, {
      method: 'DELETE'
    }).then((xhr) => {
      expect(xhr.success)
      deletedAuthor = xhr.author
    })
  });

  Then('my author will not be in the list', function () {
    const matches = authors.filter((a) => {
      return a.vendorId == deletedAuthor.vendorId
    })
    console.log(matches)
  });
