import { connect, Provider } from 'react-redux'
import AuthorDetails from '../components/AuthorDetails'
import {getAuthor} from '../redux/authors'

const mapStateToProps = function(state){
  const {loading} = state.authors
  const author    = loading ? {} : state.authors.details
  const { name,about,vendorId } = author
  const aboutText = (about || '').split('<br />')
  
  return {
    loading,
    name,
    about:  aboutText,
    vendorId
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