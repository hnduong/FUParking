import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import createStore from './Redux'
import registerScreens from './registerScreens'

import Selectors from './Utils/Selectors'
import Config from './config'

import { iconsMap, iconsLoaded } from './Resources/Icons'

const store = createStore()

registerScreens(store, Provider)

class App extends React.Component {
  constructor (props) {
    super(props)
    store.subscribe(this.onStoreUpdate)
    store.dispatch({ type: 'STARTUP' })
  }

  root = null

  onStoreUpdate = () => {
    const root = Selectors.getRoot(store.getState())
    if (this.root !== root) {
      this.startApp(root)
      this.root = root
    }
  }

  startApp = async (root) => {
    iconsLoaded.then(() => {
      switch (root) {
        case Config.root.Authenticated:
          Navigation.startTabBasedApp({
            tabs: [
              {
                label: 'Available',
                screen: 'AvailableSpaces',
                icon: iconsMap['ios-person']
              },
              {
                label: 'Home',
                screen: 'Home',
                icon: iconsMap['ios-person']
              },
              {
                label: 'Settings',
                screen: 'Settings',
                icon: iconsMap['ios-person']
              }
            ],
            tabsStyle: {
              initialTabIndex: 1
            },
            appStyle: {
              orientation: 'portrait'
            },
            drawer: {
              left: {
                screen: 'Drawer'
              },
              type: 'MMDrawer',
              animationType: 'parallax'
            },
            animationType: 'fade'
          })
          break
        default:
          Navigation.startSingleScreenApp({
            screen: {
              screen: 'Welcome',
              navigatorStyle: {
                navBarHidden: true,
                statusBarHidden: false
              }
            }
          })
      }
    })
  }
}

export default App
