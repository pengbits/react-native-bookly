import { connect, Provider } from 'react-redux'
import MainView from '../components/MainView'
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

const MainViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView)

export default MainViewContainer