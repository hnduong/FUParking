import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, View, Picker, TouchableOpacity } from 'react-native'
import Immutable from 'immutable'
import { ButtonGroup } from 'react-native-elements'

import { FUPScrollView, FUPComponent } from '../Components'

import { App } from '../Theme'

class AvailableSpaces extends FUPComponent {
  static navigatorStyle = {
    navBarHidden: false,
    topBarElevationShadowEnabled: false
  }
  static navigatorButtons = {
    leftButtons: [
      {
        component: 'MenuButton',
        showAsAction: 'always'
      }
    ]
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <FUPScrollView>

        </FUPScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...App.screen,
  ...App.form,
  ...App.layout
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AvailableSpaces)
