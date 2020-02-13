import {defineFeature, loadFeature} from 'jest-cucumber';
import mockStore, { expectActions, resultingState } from  '../../../src/client/mockStore'

import rootReducer from '../../../src/client/redux/index'
import {
  getAuthors, GET_AUTHORS
} from '../../../src/client/redux/app'

defineFeature(loadFeature('./features/client/authors.feature'), test => {
  test('AuthorList', ({ given, when, and, then }) => {
    let store,
      beforeState,
      afterState,
      json
    ;
    
    given('there are authors in the database', () => {
      //
    });

    when('I render the AuthorList', () => {
      store = mockStore(rootReducer())
      beforeState = store.getState()
    });
    
    then('there will be a fetch to the server', () => {
      return store.dispatch(getAuthors()).then(() => {
        afterState = resultingState(store, rootReducer)
      })
    })

    when('it loads', () => {
      expectActions(store, [
        `${GET_AUTHORS}_PENDING`,
        `${GET_AUTHORS}_FULFILLED`
      ])
      expect(afterState.app.loading).toBe(false)
    });

    then('there will be authors in the list', () => {
      expect(afterState.app.authors.length).toBeGreaterThan(0)
    })
  })
})