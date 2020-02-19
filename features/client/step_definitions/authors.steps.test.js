import moxios from 'moxios'
import {defineFeature, loadFeature} from 'jest-cucumber';

// mocks
import mockStore, { expectActions, resultingState, respondWithMockResponse } from  '../../../src/client/mockStore'
import getAuthorsMock from '../../../mocks/get-authors.mock'
import getAuthorMock  from '../../../mocks/get-author.mock'
import generateSearchForAuthorMock from '../../../mocks/search-for-author-mock'
import withMockAuthor from '../../server/step_definitions/utils/withMockAuthor'


// reducers
import rootReducer from '../../../src/client/redux/index'
import { 
  getAuthors,       GET_AUTHORS,
  getAuthor,        GET_AUTHOR,
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
    query,
    searchResultMock
  ;

  test('AuthorList', ({ given, when, and, then }) => {
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
  
  test('AuthorDetails', ({ given, when, then }) => {
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
  
  test('Find an author by name', ({ given, when, then }) => {
    given('the name of a well-known author', () => {
      expectedAuthor = withMockAuthor()
    });

    when('I enter the author\'s name in the searchbox', () => {
      query = expectedAuthor.name.replace(' ','%20')
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
        vendorId: expectedAuthor.vendorId,
        name:     expectedAuthor.name,
        link:     searchResultMock.author.link
      }
      ])
    })
  })



})