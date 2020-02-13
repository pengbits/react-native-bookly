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
      afterState
    ;
    
    given('there are authors in the database', () => {
      //
    });

    when('I render the AuthorList', () => {
      store = mockStore(rootReducer())
      beforeState = store.getState()
    });
    
    then('there will be a fetch to the server', () => {
      store.dispatch(getAuthors())
    })

    when('it loads', () => {
      afterState = resultingState(store, rootReducer)
    });

    then('there will be authors in the list', () => {
      expectActions(store, [
        GET_AUTHORS
      ])
    })
  })
})