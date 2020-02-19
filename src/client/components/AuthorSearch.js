import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native'

export default class AuthorSearch extends Component {  
  render(){
    const {
      loading,
      searchResults,
      query
    } = this.props
    
    return (
      <View>
        <Text>Enter Author Name:</Text>
      </View>
    )
  }
}
