import React, {Component} from 'react'
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  Button,
  View
} from 'react-native'

export default class AuthorList extends Component {
  render(){
    return (
      <View>
        <FlatList
          data={this.props.authors}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.vendorId}>
        </FlatList>
        <View style={styles.separator} />
        <Button title="Add Author" 
          onPress={this.onAddAuthor.bind(this)}
        />
      </View>
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
  
  onAddAuthor(){
    this.props.onAddAuthor()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});