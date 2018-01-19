import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import createStore from './Redux'
import registerScreens from './registerScreens'

const store = createStore()

registerScreens(store, Provider)

class App extends React.Component {
  render () {
    return null
  }
}

Navigation.startSingleScreenApp({
  screen: {
    screen: 'FUParking.Login',
    navigatorStyle: {
      navBarHidden: true,
      statusBarHidden: false
    }
  }
})

export default App
