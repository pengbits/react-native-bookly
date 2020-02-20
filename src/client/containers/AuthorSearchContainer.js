import { connect, Provider } from 'react-redux'
import AuthorSearch from '../components/AuthorSearch'
import {
  searchForAuthor
} from '../redux/authors'

const mapStateToProps = function(state){
  const {
    loading,
    query,
    searchResults
  } = state.authors

  return {
    query,
    loading,
    searchResults
  }
}

const mapDispatchToProps = {
  searchForAuthor
}

const AuthorSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorSearch)

export default AuthorSearchContainer