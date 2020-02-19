import {defineFeature, loadFeature} from 'jest-cucumber';
import GetAuthorsMock from '../../../mocks/get-authors.mock'
import fetch from './utils/fetch'
import {SeedModel} from '../../../src/server/db/seeds'

let authors
let author
let expectedAuthor
let deletedAuthor
let authorEdits
let authorQuery 

beforeAll(async() => {
  await SeedModel('Author').then(xhr => console.log('Seeded db with author data'))
})

const withMockAuthor = () => {
  const {length}     = GetAuthorsMock.authors
  const i            = Math.floor(Math.random() * length)
  expectedAuthor     = GetAuthorsMock.authors[i]
  return expectedAuthor
}

defineFeature(loadFeature('./features/server/authors.feature'), test => {

  
        
  // GET /authors
  test('Get Authors', ({ given, when, and, then }) => {
    given('there are authors in the database', function () {
      expect(GetAuthorsMock.authors.length).toBeGreaterThan(0) // not proof of anything really, 
    })

    when('I fetch the authors endpoint', async () =>  {
      authors = []
      await fetch(`/authors`).then((json) => {
        authors = json.authors
      })
    })

    then('the response will contain a list of authors', function () {
      expect(authors.length).toBeGreaterThan(0)
    })
  })
  
  
  // GET /authors/9226  
  // todo - if not in db, should we optimisticlly import from vendor? 
  test('Get an author', ({ given, when, and, then }) => {
    given('there are authors in the database', function () {})
  
    when('I fetch the author details endpoint', async () => {
      author = undefined
      withMockAuthor()
      await fetch(`/authors/${expectedAuthor.vendorId}`).then((json) => {
        author = json.author
      })
    })

    then('the response will contain details about the author', function () {
      expect(author).toBeTruthy()
      expect(Object.keys(author)).toEqual(expect.arrayContaining(['_id','vendorId','name','about']))
    })
  })
  
  // POST /authors {name:'William Gibson','vendorId':9226}
  test('Create an Author', ({ given, when, and, then }) => {
  
    // IMPORTANT: we can't reuse one of the mocks for this step
    given('I have an author with valid attributes', function () {
      expectedAuthor = {
        name: "Jonathan Tropper",
        vendorId: "26163",
        about: "Jonathan Tropper is the author of Everything Changes, The Book of Joe , which was a Booksense selection, and Plan B"
      }
    })

    when('I save the author to the database', async () => {
      await fetch(`/authors`, {
        method: 'POST',
        body: {
          name      : expectedAuthor.name, 
          about     : expectedAuthor.about, 
          vendorId  : expectedAuthor.vendorId
        }
      })
    })
    
    and('I fetch the authors endpoint', async () =>  {
      authors = []
      await fetch(`/authors`).then((json) => {
        authors = json.authors
      })
    })
     
    then('my author will be in the list', async () => {
      authors = []
      await fetch(`/authors`).then((json) => {
        authors = json.authors
      })
      const matches = authors.filter(a => a.vendorId == expectedAuthor.vendorId)
      expect(matches).toHaveLength(1)
    })
  })
  
  
  // DELETE /authors/9226
  test('Delete an Author', ({ given, when, and, then }) => {
    given('there are authors in the database', function () {})
    
    given('I have an author I want to delete', () => {
      withMockAuthor()
      expect(typeof expectedAuthor.vendorId).toBe('string')
    })

    when('I fetch the delete author endpoint', async () => {
      await fetch(`/authors/${expectedAuthor.vendorId}`, {
        method: 'DELETE'
      }).then((xhr) => {
        expect(xhr.success)
        deletedAuthor = xhr.author
      })
    })
    
    and('I fetch the authors endpoint', async () =>  {
      authors = []
      await fetch(`/authors`).then((json) => {
        authors = json.authors
      })
    })
    
    then('my author will not be in the list',  () => {
      const matches = authors.filter((a) => {
        return a.vendorId == deletedAuthor.vendorId
      })
      expect(matches).toHaveLength(0)
    })
  })
  
  
  // PUT /authors/9226
  test('Update an Author', ({ given, when, and, then }) => {
    given('there are authors in the database', function () {})

    when('I fetch the author details endpoint', async () => {
      author = undefined
      withMockAuthor()
      await fetch(`/authors/${expectedAuthor.vendorId}`).then((json) => {
       author = json.author
      })
    })

    and('I make changes to the author', () => {
      authorEdits = {
       name  : expectedAuthor.name  + ' _EDIT_',
       about : expectedAuthor.about + ' _EDIT_'
      }
    })

    when('I send the changes to the author details endpoint', async () => {
      await fetch(`/authors/${expectedAuthor.vendorId}`, {
       method: 'PUT',
       body: {
         name: authorEdits.name,
         about: authorEdits.about
       }
      }).then((xhr) => {
       expect(xhr.success)
      })
    })
        
    then('the author contains my changes', async () => {
    // (when i fetch the author details endpoint)
      author = undefined
      await fetch(`/authors/${expectedAuthor.vendorId}`).then((json) => {
       author = json.author
      })
      expect(author).toEqual(expect.objectContaining(authorEdits))
    })
  })
 
  
  // GET /authors/search?q=william%20gibson
  test('Find an author by name', ({ given, when, and, then }) => {
    given('the name of a well-known author', () => {
      authorQuery = 'William Gibson'
    })

    when('I visit the search endpoint with the name as the query and type=\'author\'', async () => {
      await fetch(`/authors/search`, {
        params:{
          q:authorQuery
        }
      })
      .then(xhr => {
        author = xhr.author
        expect(author.name.toLowerCase()).toMatch(new RegExp(authorQuery.toLowerCase()))    
      })
    })  
    
    then('the response will contain a name and id for the author', () => {
      expect(author).toBeTruthy()
      expect(Object.keys(author)).toEqual(expect.arrayContaining(['vendorId','name','link']))
    })
  })

  
  // GET /authors/9226/vendor
  test('Get an Author from Vendor', ({ given, when, and, then }) => {

    let authorId
    given('I have an author\'s vendorId', () => {
      authorId = 9226
    })

    when('I visit the get-vendor-author endpoint', async () => {
      await fetch(`/authors/${authorId}/vendor`).then(xhr => {
        author = xhr.author
      })
    })

    then('the response will contain the vendor\'s record for the author',  () => {
      expect(author).toBeTruthy()
      expect(Object.keys(author)).toEqual(expect.arrayContaining(['vendorId','name','link','about','image']))
    })
  })
  
  test('Find an author by name', ({ given, when, then }) => {
    given('the name of a well-known author', () => {

    });

    when('I enter the author\'s name in the searchbox', () => {

    });

    then('there will be a fetch to the search endpoint', () => {

    });

    when('it loads', () => {

    });

    then('the searchbox will contain an Author result', () => {

    });
  });


})