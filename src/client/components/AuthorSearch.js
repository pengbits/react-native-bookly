import React, {Component} from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button ,
  TouchableOpacity  
} from 'react-native'


const Results = ({authors}) => {
  return authors.length ?
    <View style={styles.results}>
      <Text>Found {authors.length} authors:</Text>
      {authors.map((author) => (
        <TouchableOpacity 
         key={author.vendorId}
          style={styles.resultItem}
          onPress={() => {console.log('get from vendor '+author.vendorId)}}
        >
          <Text>
            {author.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    : 
    null
}

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
        <Results 
          authors={searchResults}
        />
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
  },
  results: {
    margin: 10
  },
  resultItem: {
    backgroundColor: '#ccc',
    padding: 20,
    marginVertical: 8,

  }
})
