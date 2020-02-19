import React, {Component} from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button  
} from 'react-native'


export default class AuthorSearch extends Component {  
  render(){
    const {
      loading,
      query,
      searchResults
    } = this.props
    
    return (
      <View>
        <Text style={styles.label}>Enter Author Name:</Text>
        <TextInput name={name} 
          style={styles.input} 
          onChangeText={this.onChangeText.bind(this)}
          onSubmitEditing={this.onSubmit.bind(this)}
          />
        {(searchResults || []).map(author => <Text key={author.vendorId}>author.name)</Text>)}
      </View>
    )
  }
  
  
  onChangeText(text){
    this.setState({text})
  }
  
  onSubmit(){
    console.log(`search for '${this.state.text}'`)
    this.props.searchForAuthor({
      query: this.state.text
    })
  }
}

const styles = StyleSheet.create({
  label: {
    margin: 10
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 22
  }
  
})
