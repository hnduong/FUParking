import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, View, Picker, TouchableOpacity } from 'react-native'
import Immutable from 'immutable'
import { ButtonGroup, Card, Icon } from 'react-native-elements'

import { FUPScrollView, FUPInput, FUPComponent, FUPText } from '../Components'

import UserActions from '../Redux/User'

import { App } from '../Theme'

class Settings extends FUPComponent {
  constructor (props) {
    super(props)
    this.setNavigatorToButtons({
      rightButtons: [
        {
          component: 'MenuButton',
          id: '22',
          showAsAction: 'always'
        }
      ]
    })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <FUPScrollView underHeader>
        </FUPScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...App.screen,
  ...App.form,
  ...App.layout,
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
