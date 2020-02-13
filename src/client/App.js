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


const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <SafeAreaView>
          <View style={styles.container}>
            <Text>
            Ahoy
            </Text>
          </View>
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
