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
          onAddAuthor={this.onAddAuthor.bind(this)}
        />
      </SafeAreaView>
    )
  }
  
  fetchAuthors(){
    this.props.getAuthors()
  }
  
  onSelectAuthor({vendorId}){
    const {navigation} = this.props
    navigation.navigate('AuthorDetails', {vendorId})
  }
  
  onAddAuthor(){
    const {navigation} = this.props
    this.props.navigation.navigate('AddAuthor')
  }
  
  navigate(view, opts={}){
    this.props.navigate(view, opts)
  }
}