import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, Image, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable'

import CircularText from '../../Components/CircularText'
import FUPScrollView from '../../Components/FUPScrollView'
import FUPComponent from '../../Components/FUPComponent'
import FUPText from '../../Components/FUPText'
import { App, Metrics } from '../../Theme'

const orbit = require('../../Resources/Images/orbit.png')

class Welcome extends FUPComponent {
  state = {
    colorTop: '#FEAC5E',
    colorMiddle: '#C779D0',
    colorBottom: '#4BC0C8'
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        count: this.state.count + 1,
        colorTop: this.incrementColor(this.state.colorTop, 1),
        colorBottom: this.incrementColor(this.state.colorBottom, -1)
      })
    }, 20)
  }

  goToLogin = () => {
    this.navigate('FUParking.Login')
  }

  incrementColor (color, step) {
    const intColor = parseInt(color.substr(1), 16)
    const newIntColor = (intColor + step).toString(16)
    return `#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`
  }

  render () {
    return (
      <LinearGradient
        colors={[this.state.colorTop, this.state.colorMiddle, this.state.colorBottom]}
        style={[styles.mainContainer]}
      >
        <FUPScrollView scrollEnabled={false}>
          <View style={styles.welcomeTextContainer}>
            <FUPText h4 bold center>Welcome to</FUPText>
            <FUPText h4 bold center>Frog UTC Parking</FUPText>
          </View>
          <View>
            <Animatable.View direction='reverse' useNativeDriver easing='linear' duration={30000} animation='rotate' iterationCount='infinite' style={{ position: 'absolute', width: 250, height: 250, justifyContent: 'center', alignItems: 'center' }}>
              <CircularText circumference={250} text='Frogs Only*Others Will Be Toad*' textStyle={{ medium: true, bold: true }} degOffset={45} />
            </Animatable.View>
            <Animatable.View useNativeDriver easing='linear' duration={60000} animation='rotate' iterationCount='infinite' style={{ width: 250, height: 250, justifyContent: 'center', alignItems: 'center' }}>
              <Image resizeMode='contain' source={orbit} style={styles.orbit} />
            </Animatable.View>
          </View>
          <Button title='Login In Now' onPress={this.goToLogin} />
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
  orbit: {
    width: 200,
    height: 176.66
  },
  welcomeTextContainer: {
    marginTop: Metrics.doubleBaseMargin
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
