import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native'

export default class AuthorDetails extends Component {
  componentDidMount() {
    const {getAuthor} = this.props
    const vendorId = '245590'
    getAuthor({
      vendorId
    })
  }
  
  render(){
    const {
      loading,
    } = this.props
    
    const {
      name,
      about,
      vendorId
    } = this.props
    
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <View>
        {about.map((p,i) => <Text key={i} style={styles.about}>{p}</Text>)}
        </View>
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