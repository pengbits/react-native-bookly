// libs
import React from 'react';
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

// app:components
import AuthorDetails from './containers/AuthorDetailsContainer'
import AuthorList from './containers/AuthorListContainer'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
} from 'react-native';

// import MainView from './containers/MainViewContainer'
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
        <Stack.Navigator>
        <Stack.Screen
          name="AuthorList"
          component={AuthorList}
          options={{title: 'Authors'}}
        />
        <Stack.Screen
          name="AuthorDetails" 
          component={AuthorDetails} 
        />
      </Stack.Navigator>
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
