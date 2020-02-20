import moxios from 'moxios'
import axios from 'axios'
import {defineFeature, loadFeature} from 'jest-cucumber';

// mocks
import mockStore, { expectActions, resultingState, respondWithMockResponse } from  '../../../src/client/mockStore'
import getAuthorsMock from '../../../mocks/get-authors.mock'
import getAuthorMock  from '../../../mocks/get-author.mock'
import createAuthorMock from '../../../mocks/create-author-mock'
import generateSearchForAuthorMock from '../../../mocks/search-for-author-mock'
import withMockAuthor from '../../server/step_definitions/utils/withMockAuthor'


// reducers
import rootReducer from '../../../src/client/redux/index'
import { 
  getAuthors,       GET_AUTHORS,
  getAuthor,        GET_AUTHOR,
  createAuthor,     CREATE_AUTHOR,
  searchForAuthor,  SEARCH_FOR_AUTHOR
} from '../../../src/client/redux/authors'

defineFeature(loadFeature('./features/client/authors.feature'), test => {
  
  beforeEach(function(){ 
    moxios.install()   
    getInitialState()
  })
  
  afterEach(function(){ 
    moxios.uninstall() 
  })
 
  const there_are_authors_in_the_db = () => {
    expect(getAuthorsMock.authors.length).toBeGreaterThan(1)
  }
  
  const getInitialState = () => {
    store = mockStore(rootReducer())
    beforeState = store.getState()
  }

  let store,
    beforeState,
    afterState,
    expectedAuthor,
    createdAuthor,
    query,
    searchResultMock
  ;

  test('List Authors', ({ given, when, and, then }) => {
    given('there are authors in the database', there_are_authors_in_the_db)
    
    when('I render the AuthorList', () => {})
    
    then('there will be a fetch to the server', () => {
      respondWithMockResponse(moxios, getAuthorsMock)
      return store.dispatch(getAuthors()).then(() => {
        afterState = resultingState(store, rootReducer)
      })
    })

    when('it loads', () => {
      expectActions(store, [
        `${GET_AUTHORS}_PENDING`,
        `${GET_AUTHORS}_FULFILLED`
      ])
      expect(afterState.authors.loading).toBe(false)
    });

    then('there will be authors in the list', () => {
      expect(afterState.authors.list.length).toBeGreaterThan(0)
    })
  })
  
  test('Show Author Details', ({ given, when, then }) => {
    given('there are authors in the database', there_are_authors_in_the_db)
    when('I render the AuthorDetails', () => {
      getInitialState()
      expectedAuthor = withMockAuthor()
    })

    then('there will be a fetch to the server', () => {
      respondWithMockResponse(moxios, {
        ...getAuthorMock,
        author: expectedAuthor
      })
      return store.dispatch(getAuthor({
        vendorId: expectedAuthor.vendorId
      })).then(() => {
       afterState = resultingState(store, rootReducer)
      })
    });

    when('it loads', () => {
      expectActions(store, [
        `${GET_AUTHOR}_PENDING`,
        `${GET_AUTHOR}_FULFILLED`
      ])
      expect(afterState.authors.loading).toBe(false)
    });

    then('the view will be populated with some Author attributes', () => {
      expect(afterState.authors.details).toEqual(expect.objectContaining(expectedAuthor))
      // console.log(afterState.authors.details)
    });
  })
  
  test('Search for author by name', ({ given, when, then }) => {
    given('the name of a well-known author', () => {
      expectedAuthor = getAuthorsMock.authors.find(a => a.vendorId == "17343848")//withMockAuthor()
    });

    when('I enter the author\'s name in the searchbox', () => {
      query = expectedAuthor.name
    });

    then('there will be a fetch to the search endpoint', () => {
      searchResultMock = generateSearchForAuthorMock(expectedAuthor)
      respondWithMockResponse(moxios, searchResultMock)
      return store.dispatch(searchForAuthor({query}))
        .then(() => {
          expectActions(store, [
            `${SEARCH_FOR_AUTHOR}_PENDING`,
            `${SEARCH_FOR_AUTHOR}_FULFILLED`
          ])
          afterState = resultingState(store, rootReducer)
        })
    });

    when('it loads', () => {
    });

    then('the searchbox will contain an Author result', () => {
      expect(afterState.authors.searchResults).toEqual([
      {
       vendorId: searchResultMock.author.vendorId,
       name:     searchResultMock.author.name,
       link:     searchResultMock.author.link
      }
      ])
    })
  })

  test('Create an author', ({ given, when, and, then }) => {
    given('I have an author with valid attributes', () => {
      expectedAuthor = Object.assign({}, createAuthorMock.author)
      '_id __v vendorId name about'.split(' ').map(k => expect(expectedAuthor[k]).not.toBe(undefined))
    });

    when('I save the author to the database', () => {
      respondWithMockResponse(moxios, createAuthorMock)
      return store.dispatch(createAuthor(expectedAuthor))
        .then(xhr => {
          afterState = resultingState(store, rootReducer)
        })
    });

    when('It loads', () => {})

    then('my author will be in the list', () => {
      createdAuthor = afterState.authors.list.find(a => a.vendorId == expectedAuthor.vendorId)
      expect(createdAuthor).not.toBe(undefined)
    })
  })


})