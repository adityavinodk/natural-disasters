import { createAppContainer, createSwitchNavigator } from 'react-navigation'

// import the different screens
import Loading from './client/auth/Loading'
import SignUp from './client/auth/SignUp'
import Login from './client/auth/Login'
import Main from './client/homepage/Main'

// create our app's navigation stack
const App = createSwitchNavigator(
  {
    LoadScreen: Loading,
    SignUpScreen: SignUp,
    LoginScreen: Login,
    MainScreen: Main
  },
  {
    initialRouteName: 'LoadScreen'
  }
)

export default createAppContainer(App)