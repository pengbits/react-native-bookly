// libs
import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

//redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

// redux-async
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware'

// app:redux
import rootReducer from './redux'

// app:middleware
import RedirectMiddleware from './middleware/redirect-middleware'

// app:components
import AppContainer from './containers/AppContainer'

const initialState = rootReducer()
const store = createStore(
  rootReducer, 
  initialState, 
  applyMiddleware(
    RedirectMiddleware,
    promiseMiddleware,
    thunk
  )
)

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
