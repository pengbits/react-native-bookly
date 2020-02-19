import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import AuthorList from './AuthorList'



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
    } = this.props
    
    navigation.navigate('AuthorDetails', {vendorId})
  }
}