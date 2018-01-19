import { Navigation } from 'react-native-navigation'

import { Login, Register } from './Containers/Authentication'

export default (store, Provider) => {
  Navigation.registerComponent('FUParking.Login', () => Login, store, Provider)
  Navigation.registerComponent('FUParking.Register', () => Register, store, Provider)
}
