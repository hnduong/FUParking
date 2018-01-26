import React from 'react'
import { connect } from 'react-redux'
import ReactNative, { Animated, StyleSheet, Image, View, NativeModules, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable'
import Lottie from 'lottie-react-native'

import CircularText from '../../Components/CircularText'
import FUPScrollView from '../../Components/FUPScrollView'
import FUPComponent from '../../Components/FUPComponent'
import FUPText from '../../Components/FUPText'
import FUPButton from '../../Components/FUPButton'

import { App, Metrics, Colors } from '../../Theme'

const { ScrollViewManager } = NativeModules

const orbit = require('../../Resources/Images/orbit.png')

class Welcome extends FUPComponent {
  state = {
    animatedGradient: true,
    colorTop: '#FEAC5E',
    colorMiddle: '#C779D0',
    colorBottom: '#4BC0C8',
    progress: new Animated.Value(0),
    pageWidth: 0,
    maxWidth: 0,
    currentWidth: 0,
    numPages: 0
  }

  goToLogin = () => {
    this.navigate('FUParking.Login')
  }

  onLayout = (event) => {
    const pageWidth = event.nativeEvent.layout.width
    if (ScrollViewManager && ScrollViewManager.getContentSize) {
      ScrollViewManager.getContentSize(ReactNative.findNodeHandle(this.scrollView), (contentSize) => {
        const maxWidth = contentSize.width
        this.setState({ pageWidth, maxWidth, numPages: maxWidth / pageWidth })
      })
    }
  }

  onScroll = (event) => {
    const { contentOffset, contentSize } = event.nativeEvent
    let progress = (contentOffset.x / contentSize.width) * (4 / 3)
    if (progress < 0) progress = 0
    this.setState({ progress })
  }

  render () {
    return (
      <LinearGradient
        colors={[this.state.colorTop, this.state.colorMiddle, this.state.colorBottom]}
        style={[styles.mainContainer]}
      >
        <ScrollView
          ref={this.setRef('scrollView')}
          horizontal
          onScroll={this.onScroll}
          pagingEnabled
          scrollEventThrottle={1}
          onLayout={this.onLayout}
        >
          <View style={styles.slide}>
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
          <View style={styles.slide}>
            <FUPScrollView scrollEnabled={false}>

            </FUPScrollView>
          </View>
        </ScrollView>
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
  slide: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth
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
