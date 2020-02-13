import React, {Component} from 'react';

import AuthorList from './AuthorList'
import {
  View,
  Text  ,
  Button
} from 'react-native';


export default class MainView extends Component {
  componentDidMount(){
    this.fetchAuthors()
  }
  
  render(){
    const {
      authors, 
      loading
    } = this.props
    
    return (<View>
      <AuthorList authors={authors} style={{}}/>
    </View>)
  }
  
  fetchAuthors(){
    this.props.getAuthors()
  }
}