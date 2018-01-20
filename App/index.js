import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import createStore from './Redux'
import registerScreens from './registerScreens'

const store = createStore()

registerScreens(store, Provider)

const getRoot = state => state.App.get('root')

class App extends React.Component {
  constructor (props) {
    super(props)
    store.dispatch({ type: 'TRACK_EVENT', name: 'Opened App' })
    store.subscribe(this.onStoreUpdate.bind(this))
    store.dispatch({ type: 'STARTUP' })
  }

  root = null

  onStoreUpdate = () => {
    const root = getRoot(store.getState())
    if (this.root !== root) {
      this.startApp(root)
      this.root = root
    }
  }

  startApp = (root) => {
    switch (root) {
      case 'authentication':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'FUParking.Login',
            navigatorStyle: {
              navBarHidden: true,
              statusBarHidden: false
            }
          }
        })
        break
      case 'authenticated':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'FUParking.Home',
            navigatorStyle: {
              navBarHidden: true,
              statusBarHidden: false
            }
          },
          drawer: {
            left: {
              screen: 'FUParking.Drawer'
            },
            type: 'TheSideBar',
            animationType: 'facebook'
          }
        })
        break
    }
  }
}

export default App
