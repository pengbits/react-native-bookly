import moxios from 'moxios'
import {defineFeature, loadFeature} from 'jest-cucumber';

// mocks
import mockStore, { expectActions, resultingState, respondWithMockResponse } from  '../../../src/client/mockStore'
import getAuthorsMock from '../../../mocks/get-authors.mock'

// reducers
import rootReducer from '../../../src/client/redux/index'
import { getAuthors, GET_AUTHORS} from '../../../src/client/redux/authors'

defineFeature(loadFeature('./features/client/authors.feature'), test => {
  
  beforeEach(function(){ moxios.install()   })
   afterEach(function(){ moxios.uninstall() })
 
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
    json
  ;
  test('AuthorList', ({ given, when, and, then }) => {
    given('there are authors in the database', there_are_authors_in_the_db)
    
    when('I render the AuthorList', () => getInitialState())
    
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
    when('I render the AuthorDetails', () => getInitialState())


    then('there will be a fetch to the server', () => {

    });

    when('it loads', () => {

    });

    then('the view will be populated with some Author attributes', () => {

    });
  })

})