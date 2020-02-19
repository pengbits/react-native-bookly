import React, {Component} from 'react'
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet
} from 'react-native'

export default class AuthorList extends Component {
  render(){
    return (
      <FlatList
        data={this.props.authors}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={item => item.vendorId}>
      </FlatList>
    )
  }
  
  renderItem({item}){
    const {onSelectAuthor} = this.props
    return (<Text
      style={[
        styles.item
      ]}
      onPress={() => onSelectAuthor({vendorId: item.vendorId})}>
      {item.name}
    </Text>)
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