import React, {Component} from 'react'
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet
} from 'react-native'

export default class AuthorList extends Component {
  render(){
    const {authors} = this.props
    return (
      <FlatList
        data={authors}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={item => item.vendorId}>
      </FlatList>
    )
  }
  
  renderItem({item}){
    const {navigation} = this.props
    return (<Text
      style={[
        styles.item
      ]}
      onPress={() => this.getAuthorDetails({vendorId: item.vendorId})}>
      {item.name}
    </Text>)
  }
  
  getAuthorDetails({vendorId}){
    console.log('get author! '+vendorId)
  }
}

const styles = StyleSheet.create({
  container: {
  },
  item: {
    backgroundColor: '#ccc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});