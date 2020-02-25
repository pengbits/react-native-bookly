import { connect, Provider } from 'react-redux'
import AuthorForm from '../components/AuthorForm'
import {createAuthor} from '../redux/authors'

const mapStateToProps = function(state){
  const {
    loading,
    details
  } = state.authors
  const {
    pending,
    view
  } = state.navigator
  return {
    initialValues: details,
    loading,
    details,
    pendingRedirect: (pending && view ? view : undefined)
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