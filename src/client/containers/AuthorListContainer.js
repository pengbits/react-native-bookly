import { connect, Provider } from 'react-redux'
import AuthorList from '../components/AuthorListWrapper'
import {getAuthors} from '../redux/authors'

const mapStateToProps = function(state){
  return {
    authors: state.authors.list,
    loading: state.loading
  }
}

const mapDispatchToProps = {
  getAuthors
}

const AuthorListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorList)

export default AuthorListContainer