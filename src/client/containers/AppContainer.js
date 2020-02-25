import { connect, Provider } from 'react-redux'
import App from '../components/App'

const mapStateToProps = function(state){
  return {}
}

const mapDispatchToProps = {}


const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer