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
import FUPButton from '../../Components/FUPButton'

import { App, Metrics, Colors } from '../../Theme'

const orbit = require('../../Resources/Images/orbit.png')

class Welcome extends FUPComponent {
  state = {
    animatedGradient: true,
    colorTop: '#FEAC5E',
    colorMiddle: '#C779D0',
    colorBottom: '#4BC0C8'
  }

  goToLogin = () => {
    this.navigate('FUParking.Login')
  }

  render () {
    return (
      <LinearGradient
        colors={[this.state.colorTop, this.state.colorMiddle, this.state.colorBottom]}
        style={[styles.mainContainer]}
      >
        <Swiper
          style={styles.wrapper}
          loop={false}
          dotStyle={styles.dot}
          activeDotStyle={styles.dot}
          activeDotColor={Colors.white}
          dotColor={Colors.charcoal}
        >
          <View style={styles.slide1}>
            <FUPScrollView scrollEnabled={false}>
              <View style={styles.welcomeTextContainer}>
                <FUPText h4 bold center>Welcome to</FUPText>
                <FUPText h4 bold center>Frog UTC Parking</FUPText>
              </View>
              <View style={styles.circular}>
                <Animatable.View direction='reverse' useNativeDriver easing='linear' duration={30000} animation='rotate' iterationCount='infinite' style={{ position: 'absolute', width: 250, height: 250, justifyContent: 'center', alignItems: 'center' }}>
                  <CircularText circumference={250} text='Frogs Only*Others Will Be Toad*' textStyle={{ medium: true, bold: true }} degOffset={45} />
                </Animatable.View>
                <Animatable.View useNativeDriver easing='linear' duration={60000} animation='rotate' iterationCount='infinite' style={{ width: 250, height: 250, justifyContent: 'center', alignItems: 'center' }}>
                  <Image resizeMode='contain' source={orbit} style={styles.orbit} />
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
        <FUPButton
          style={styles.loginButtonContainer}
          textStyle={{ color: Colors.white, center: true }}
          text='Login'
          onPress={this.goToLogin}
        />
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
    paddingVertical: 10
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
    fontWeight: 'bold'
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
