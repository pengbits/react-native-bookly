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
   
  test('AuthorList', ({ given, when, and, then }) => {
    let store,
      beforeState,
      afterState,
      json
    ;
    
    given('there are authors in the database', () => {
      expect(getAuthorsMock.authors.length).toBeGreaterThan(1)
    });

    when('I render the AuthorList', () => {
      store = mockStore(rootReducer())
      beforeState = store.getState()
    });
    
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
})