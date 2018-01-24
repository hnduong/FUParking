import { Navigation } from 'react-native-navigation'

import { Login, Register, Welcome } from './Containers/Authentication'
import Drawer from './Components/Drawer'
import Home from './Containers/Home'
import MenuButton from './Components/MenuButton'

export default (store, Provider) => {
  Navigation.registerComponent('FUParking.Welcome', () => Welcome, store, Provider)
  Navigation.registerComponent('FUParking.Login', () => Login, store, Provider)
  Navigation.registerComponent('FUParking.Register', () => Register, store, Provider)
  Navigation.registerComponent('FUParking.Home', () => Home, store, Provider)
  Navigation.registerComponent('FUParking.Drawer', () => Drawer, store, Provider)
  Navigation.registerComponent('FUParking.MenuButton', () => MenuButton)
}
