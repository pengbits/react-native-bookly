// libs
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// app:components
import AuthorDetails  from '../containers/AuthorDetailsContainer'
import AuthorList     from '../containers/AuthorListContainer'
import AuthorForm     from '../containers/AuthorFormContainer'
import AuthorSearch   from '../containers/AuthorSearchContainer'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
} from 'react-native';

class AppView extends Component {
  componentDidMount() {
    console.log('cwm')
  }
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AuthorList"
            component={AuthorList}
            options={{title: 'Authors'}}
          />
          <Stack.Screen
            name="AuthorDetails" 
            component={AuthorDetails} 
            options={{title: 'Author Details'}}
          />
          <Stack.Screen
            name="FindAuthor"
            component={AuthorSearch}
            options={{title: 'Find Author'}}
          />
          <Stack.Screen
            name="AddAuthor"
            component={AuthorForm}
            options={{title: 'Add Author'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
const App: () => React$Node = () => {
  return (
    <AppView />
  );
};

const styles = StyleSheet.create({
  container: {
    margin:20
  }
});

export default App;
