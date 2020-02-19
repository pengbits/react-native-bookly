import { connect, Provider } from 'react-redux'
import AuthorList from '../components/AuthorListWrapper'
import {
  getAuthors,
  getAuthor
} from '../redux/authors'

const mapStateToProps = function(state){
  return {
    authors: state.authors.list,
    loading: state.loading
  }
}

const mapDispatchToProps = {
  getAuthors,
  getAuthor
}

const AuthorListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorList)

export default AuthorListContainer