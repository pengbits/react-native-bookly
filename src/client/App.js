// libs
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
//redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

// redux-async
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware'

// app
import rootReducer from './redux'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

// import MainView from './containers/MainViewContainer'
import AuthorDetails from './containers/AuthorDetailsContainer'
const initialState = rootReducer()
const store = createStore(
  rootReducer, 
  initialState, 
  applyMiddleware(
    promiseMiddleware,
    thunk
  )
)

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView>
          <AuthorDetails style={styles.container} />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:20
  }
});

export default App;
