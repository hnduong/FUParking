import { Navigation } from 'react-native-navigation'

import { Login, Register, Welcome } from './Containers/Authentication'
import Drawer from './Components/Drawer'
import Home from './Containers/Home'
import MenuButton from './Components/MenuButton'
import AvailableSpaces from './Containers/AvailableSpaces'
import Settings from './Containers/Settings'

export default (store, Provider) => {
  Navigation.registerComponent('Welcome', () => Welcome, store, Provider)
  Navigation.registerComponent('Login', () => Login, store, Provider)
  Navigation.registerComponent('Register', () => Register, store, Provider)
  Navigation.registerComponent('Home', () => Home, store, Provider)
  Navigation.registerComponent('AvailableSpaces', () => AvailableSpaces, store, Provider)
  Navigation.registerComponent('Settings', () => Settings, store, Provider)

  Navigation.registerComponent('Drawer', () => Drawer, store, Provider)
  Navigation.registerComponent('MenuButton', () => MenuButton, store, Provider)
}
