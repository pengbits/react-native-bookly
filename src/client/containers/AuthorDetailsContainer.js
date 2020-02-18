import { connect, Provider } from 'react-redux'
import AuthorDetails from '../components/AuthorDetails'
import {getAuthor} from '../redux/authors'

const mapStateToProps = function(state){
  return {
    author: state.authors.details,
    loading: state.loading
  }
}

const mapDispatchToProps = {
  getAuthor
}

const AuthorDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorDetails)

export default AuthorDetailsContainer