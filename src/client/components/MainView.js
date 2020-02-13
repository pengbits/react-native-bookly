import React, {Component} from 'react';


import {
  View,
  Text  ,
  Button
} from 'react-native';


export default class MainView extends Component {
  render(){
    const {
      authors, 
      loading
    } = this.props
    
    return (<View>
      <Text>Found  {authors.length} authors {loading ? '...' : ''}</Text>
      <Button 
        onPress={this.fetchAuthors.bind(this)}
        title="Get authors" />
    </View>)
  }
  
  fetchAuthors(){
    this.props.getAuthors()
  }
}