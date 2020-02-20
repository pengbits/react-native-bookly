import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

const renderInput = ({ input: { onChange, ...input }}) => {
  return <TextInput style={styles.input} onChangeText={onChange} {...input} />
}

class AuthorForm extends Component {
  render(){    
    const { handleSubmit } = this.props
    
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Name</Text>
        <Field name="name" component={renderInput} />
        <Text style={styles.label}>VendorId</Text>
        <Field name="vendorId" component={renderInput} />
        <TouchableOpacity onPress={handleSubmit(this.onSubmit.bind(this))}>
         <Text style={styles.button}>Submit</Text>
       </TouchableOpacity>
      </View>
    )
  }
  
  onSubmit (values)  {
    console.log(values)
    this.props.createAuthor(values)
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  label: {
    fontSize:20,
    marginBottom: 10,
  },
  input: {
    marginBottom:15,
    borderColor: 'black',
    borderWidth: 1,
    height: 36,
    fontSize: 18,
    width: '100%'
  },
  button: {
    marginTop: 10,
    marginBottom:15,
    backgroundColor: 'blue',
    color: 'white',
    height: 36,
    lineHeight: 36,
    textAlign: 'center',
    width: '100%'
  },
});

export default reduxForm({
  form:'author'
})(AuthorForm)