import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native'

export default class AuthorForm extends Component {
  render(){    
    return (
      <View style={styles.container}>
        <Text>Author Form</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  name: {
    fontSize: 48,
  },
  about: {
    fontSize: 18
  }
});