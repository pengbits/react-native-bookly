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
      <SafeAreaView style={styles.container}>
      <FlatList
        data={authors}
        renderItem={this.renderItem}
        keyExtractor={item => item.vendorId}>
      </FlatList>
    </SafeAreaView>
    )
  }
  
  renderItem({item}){
    console.log(item)
    return (<Text
      style={[
        styles.item
      ]}>
      {item.name}
    </Text>)
  }
}

const styles = StyleSheet.create({
  container: {
  },
  item: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});