import React, {Component} from 'react';


import {
  View,
  Text  ,
  Button
} from 'react-native';


const AuthorList = (({authors}) => <View>
  {authors.map((author,i) => <Text key={i}>{author}</Text>)}
</View>)

export default class MainView extends Component {
  render(){
    const {
      authors, 
      loading
    } = this.props
    
    return (<View>
      <Text>{loading ? 'loading...':''}</Text>
      <AuthorList authors={authors} />
      <Button 
        onPress={this.fetchAuthors.bind(this)}
        title="Get authors" />
    </View>)
  }
  
  fetchAuthors(){
    this.props.getAuthors()
  }
}