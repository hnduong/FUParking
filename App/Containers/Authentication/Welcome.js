import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Swiper from 'react-native-swiper'
import * as Animatable from 'react-native-animatable'

import CircularText from '../../Components/CircularText'
import FUPScrollView from '../../Components/FUPScrollView'
import FUPComponent from '../../Components/FUPComponent'
import FUPText from '../../Components/FUPText'
import { App, Metrics, Colors } from '../../Theme'

const orbit = require('../../Resources/Images/orbit.png')

class Welcome extends FUPComponent {
  state = {
    animatedGradient: false,
    colorTop: '#FEAC5E',
    colorMiddle: '#C779D0',
    colorBottom: '#4BC0C8',
    orbitalLayout: { x: 0, y: 0, height: 0, width: 0 },
    orbitalContainer: { x: 0, y: 0, height: 0, width: 0 },
    frogPosition: { top: 0, left: 0 }
  }

  componentDidMount () {
    if (this.state.animatedGradient) {
      this.gradientUpdateInterval = setInterval(() => {
        this.setState({
          colorTop: this.incrementColor(this.state.colorTop, 1),
          colorBottom: this.incrementColor(this.state.colorBottom, -1)
        })
      }, 20)
    }
  }

  componentWillUnmount () {
    if (this.gradientUpdateInterval) clearInterval(this.gradientUpdateInterval)
  }

  goToLogin = () => {
    this.navigate('FUParking.Login')
  }

  incrementColor (color, step) {
    const intColor = parseInt(color.substr(1), 16)
    const newIntColor = (intColor + step).toString(16)
    return `#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`
  }

  onOrbitalLayout = (e) => {
    this.setState({ orbitalLayout: e.nativeEvent.layout })
    const orbitalLayout = e.nativeEvent.layout
    const { orbitalContainer } = this.state
    this.updateFrogPosition(-3 + orbitalContainer.height / 2 + orbitalLayout.x + orbitalContainer.x, orbitalContainer.width / 2 + orbitalLayout.y)  
  }

  onOrbitalContainerLayout = (e) => {
    this.setState({ orbitalContainer: e.nativeEvent.layout })
    const orbitalContainer = e.nativeEvent.layout
    const { orbitalLayout } = this.state
    this.updateFrogPosition(-3 + orbitalContainer.height / 2 + orbitalLayout.x + orbitalContainer.x, orbitalContainer.width / 2 + orbitalLayout.y)  
  }

  updateFrogPosition = (top, left) => {
    this.setState({ frogPosition: { top, left } })
  }

  render () {
    return (
      <LinearGradient
        colors={[this.state.colorTop, this.state.colorMiddle, this.state.colorBottom]}
        style={[styles.mainContainer]}
      >
        <Image
          source={require('../../../icon.png')}
          style={{ position: 'absolute', height: 49, width: 49, left: this.state.frogPosition.left, top: this.state.frogPosition.top }}
        />
        <Swiper
          style={styles.wrapper}
          dotStyle={styles.dot}
          activeDotStyle={styles.dot}
          activeDotColor={Colors.white}
          dotColor={Colors.charcoal}
          on
        >
          <View style={styles.slide1}>
            <FUPScrollView scrollEnabled={false}>
              <View style={styles.welcomeTextContainer}>
                <FUPText h4 bold center>Welcome to</FUPText>
                <FUPText h4 bold center>Frog UTC Parking</FUPText>
              </View>
              <View onLayout={this.onOrbitalContainerLayout} style={styles.circular}>
                <Animatable.View direction='reverse' useNativeDriver easing='linear' duration={30000} animation='rotate' iterationCount='infinite' style={{ position: 'absolute', width: 250, height: 250, justifyContent: 'center', alignItems: 'center' }}>
                  <CircularText circumference={250} text='Frogs Only*Others Will Be Toad*' textStyle={{ medium: true, bold: true }} degOffset={45} />
                </Animatable.View>
                <Animatable.View useNativeDriver easing='linear' duration={60000} animation='rotate' iterationCount='infinite' style={{ width: 250, height: 250, justifyContent: 'center', alignItems: 'center' }}>
                  <Image onLayout={this.onOrbitalLayout} resizeMode='contain' source={orbit} style={styles.orbit} />
                </Animatable.View>
              </View>
              <View style={styles.descriptionContainer}>
                <FUPText center h6>An alternative to the parking application provided by University Towers</FUPText>
              </View>
            </FUPScrollView>
          </View>
          <View style={styles.slide2}>
            <FUPScrollView scrollEnabled={false}>
              <View style={styles.descriptionContainer}>
                <FUPText center h6>With focus on aethetics and usability</FUPText>
              </View>
            </FUPScrollView>
          </View>
          <View style={styles.slide3}>
            <FUPScrollView scrollEnabled={false}>
              <View style={styles.descriptionContainer}>
                <FUPText center h6>You'll save time</FUPText>
              </View>
            </FUPScrollView>
          </View>
        </Swiper>
        <TouchableOpacity style={styles.loginButtonContainer} onPress={this.goToLogin}>
          <FUPText center h6>Login</FUPText>
        </TouchableOpacity>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  ...App.screen,
  ...App.form,
  ...App.layout,
  circular: {
    marginVertical: Metrics.doubleBaseMargin
  },
  descriptionContainer: {
    width: '90%'
  },
  dot: {
    marginBottom: 3 * Metrics.baseMargin
  },
  linearGradient: {
    flex: 1
  },
  loginButtonContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 10,
    left: 0,
    right: 0,
    margin: Metrics.baseMargin
  },
  orbit: {
    width: 200,
    height: 176.66
  },
  welcomeTextContainer: {
    marginTop: Metrics.doubleBaseMargin
  },
  wrapper: {
  },
  slide1: {
    flex: 1
  },
  slide2: {
    flex: 1
  },
  slide3: {
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
