import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import Color from 'color'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import Secrets from 'react-native-config'

import createStore from './Redux'
import registerScreens from './registerScreens'

import selectors from './Utils/selectors'
import Config from './config'
import { Colors } from './Theme'

import * as TabImages from './Resources/Images'

// import createImages from './Resources/Icons/createImage'
// createImages(12, ['cogs', 'home', 'map'])

MapboxGL.setAccessToken(Secrets.MAPBOX_TOKEN)

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
    const root = selectors.getRoot(store.getState())
    if (this.root !== root) {
      this.startApp(root)
      this.root = root
    }
  }

  startApp = (root) => {
    switch (root) {
      case Config.root.Authenticated:
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'Available',
              screen: 'AvailableSpaces',
              icon: TabImages.Map
            },
            {
              label: 'Home',
              screen: 'Home',
              icon: TabImages.Home
            },
            {
              label: 'Settings',
              screen: 'Settings',
              icon: TabImages.Cogs
            }
          ],
          tabsStyle: {
            tabBarButtonColor: Colors.white,
            tabBarSelectedButtonColor: Color(Colors.secondary).darken(0.2),
            tabBarBackgroundColor: Color(Colors.secondary).lighten(0.2),
            initialTabIndex: 0
          },
          appStyle: {
            tabBarButtonColor: Colors.white,
            tabBarSelectedButtonColor: Color(Colors.secondary).darken(0.2),
            tabBarBackgroundColor: Color(Colors.secondary).lighten(0.2),
            initialTabIndex: 1,
            orientation: 'portrait', // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
            bottomTabBadgeTextColor: 'red', // Optional, change badge text color. Android only
            bottomTabBadgeBackgroundColor: 'green'
          },
          drawer: {
            left: {
              screen: 'Drawer'
            },
            type: 'MMDrawer',
            animationType: 'slide',
            disableOpenGesture: true
          }
        })
        break
      case Config.root.Authentication:
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'Welcome',
            navigatorStyle: {
              navBarHidden: true,
              statusBarHidden: false
            }
          }
        })
        break
      default:
        break
    }
  }
}

export default App
