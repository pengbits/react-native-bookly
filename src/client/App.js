/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';


const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <Text>
          Ahoy
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:20
  }
});

export default App;
