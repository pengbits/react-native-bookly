import React, {Component} from 'react';

import AuthorList from './AuthorList'
import {
  View,
  Text ,
  SafeAreaView,
  Button
} from 'react-native';


export default class MainView extends Component {
  componentDidMount(){
    this.fetchAuthors()
  }
  
  render(){
    const {
      authors, 
      loading,
    } = this.props
    
    return (
      <SafeAreaView>
        <AuthorList 
          authors={authors} 
          onSelectAuthor={this.onSelectAuthor.bind(this)}
        />
      </SafeAreaView>
    )
  }
  
  fetchAuthors(){
    this.props.getAuthors()
  }
  
  onSelectAuthor({vendorId}){
    const {
      navigation,
      getAuthorDetails
    } = this.props
    
    navigation.navigate('AuthorDetails', {vendorId})
  }
}