import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native'

export default class AuthorDetails extends Component {
  render(){
    const {
      loading,
      name,
      about,
      vendorId
    } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.about}>{about}</Text>
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
    fontSize: 22
  }
});