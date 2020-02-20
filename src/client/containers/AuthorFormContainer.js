import { connect, Provider } from 'react-redux'
import AuthorForm from '../components/AuthorForm'
import {createAuthor} from '../redux/authors'

const mapStateToProps = function(state){
  const {
    loading,
    details
  } = state.authors
  return {
    initialValues: details,
    loading,
    details
  }
}

const mapDispatchToProps = {
  createAuthor
}

const AuthorFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorForm)

export default AuthorFormContainer