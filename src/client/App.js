import React from 'react';
import { createStore } from 'redux'
import rootReducer from './redux'
import { connect, Provider } from 'react-redux'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

const store = createStore(rootReducer)

const MainView = ({authors, loading}) => {
  return (<View>
    <Text>found  {authors.length} authors {loading ? '...' : ''}</Text>
  </View>)
}

const MainViewContainer = connect(
  function(state){
    return {
      authors: state.app.authors || [],
      loading: state.app.loading
    }
  }
)(MainView)

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <SafeAreaView>
          <MainViewContainer style={styles.container} />
        </SafeAreaView>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:20
  }
});

export default App;
