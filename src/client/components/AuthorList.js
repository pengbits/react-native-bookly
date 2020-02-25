import React, {Component} from 'react'
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  Button,
  View,
  TouchableOpacity
} from 'react-native'

export default class AuthorList extends Component {
  render(){
    return (
      <View styles={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.authors}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={((item,i) => `${item.vendorId}-${i}`)}>
        </FlatList>
        <Button styles={styles.button} title="Add Author" 
          onPress={this.onAddAuthor.bind(this)}
        />
      </View>
    )
  }
  
  renderItem({item}){
    const {onSelectAuthor} = this.props
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onSelectAuthor({vendorId: item.vendorId})}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  
  onAddAuthor(){
    this.props.onAddAuthor()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    height:'90%'
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
  button : {
    height:'10%'
  }
});