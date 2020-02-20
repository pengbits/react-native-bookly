import { connect, Provider } from 'react-redux'
import AuthorForm from '../components/AuthorForm'
import {createAuthor} from '../redux/authors'

const mapStateToProps = function(state){
  return {}
}

const mapDispatchToProps = {
  createAuthor
}

const AuthorFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorForm)

export default AuthorFormContainer