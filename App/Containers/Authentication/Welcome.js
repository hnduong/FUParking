import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MIcon from 'react-native-vector-icons/MaterialIcons'

import FUPScrollView from '../../Components/FUPScrollView'
import FUPComponent from '../../Components/FUPComponent'
import FUPText from '../../Components/FUPText'
import { App, Metrics, Fonts } from '../../Theme'

class Welcome extends FUPComponent {
  handleLogin = () => {
    const { email, password } = this.state.inputs
    this.props.login({ UID: email, Password: password, ApplicationDetails: null })
  }

  goToRegister = () => {
    this.navigate('FUParking.Login')
  }

  render () {
    return (
      <LinearGradient colors={['#FEAC5E', '#C779D0', '#4BC0C8']} style={[styles.mainContainer]}>
        <FUPScrollView scrollEnabled={false}>
          <FUPText large>Welcome to</FUPText>
          <FUPText>Frog UTC Parking</FUPText>
        </FUPScrollView>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  ...App.screen,
  ...App.form,
  ...App.layout,
  linearGradient: {
    flex: 1
  },
  welcomeText: {
    marginTop: Metrics.baseMargin,
    fontSize: Fonts.size.h4,
    color: 'white'
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
