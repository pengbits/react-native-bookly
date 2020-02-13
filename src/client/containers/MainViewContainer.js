import { connect, Provider } from 'react-redux'
import MainView from '../components/MainView'
import {getAuthors} from '../redux/app'

const mapStateToProps = function(state){
  return {
    authors: state.app.authors || [],
    loading: state.app.loading
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