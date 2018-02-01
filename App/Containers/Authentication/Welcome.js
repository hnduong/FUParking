import React from 'react'
import { connect } from 'react-redux'
import ReactNative, { Animated, StyleSheet, View, NativeModules, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable'
import LottieView from 'lottie-react-native'
import { CircularText, FUPScrollView, FUPComponent, FUPText, FUPButton } from '../../Components'

import { App, Metrics, Colors } from '../../Theme'

const { ScrollViewManager } = NativeModules

const orbit = require('../../Resources/Lottie/orbit.json')

class Welcome extends FUPComponent {
  state = {
    animatedGradient: true,
    colorTop: '#FEAC5E',
    colorMiddle: '#C779D0',
    colorBottom: '#4BC0C8',
    orbitProgress: new Animated.Value(0.2),
    pageWidth: 0,
    maxWidth: 0,
    currentWidth: 0,
    numPages: 0,
    page: 0
  }

  componentDidMount () {
    this.animateForward()
  }

  animateForward = () => {
    Animated.timing(this.state.orbitProgress, {
      duration: 3000,
      toValue: 0.77
    }).start(this.animateBack)
  }

  animateBack = () => {
    Animated.timing(this.state.orbitProgress, {
      duration: 5000,
      toValue: 0.2
    }).start(this.animateForward)
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

  onMomentumScrollEnd = (event) => {
    this.setState({ page: this.state.numPages * event.nativeEvent.contentOffset.x / event.nativeEvent.contentSize.width })
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
          pagingEnabled
          onLayout={this.onLayout}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.slide}>
            <FUPScrollView scrollEnabled={false} >
              <View style={styles.welcomeTextContainer}>
                <FUPText h4 bold center>Welcome to</FUPText>
                <FUPText h4 bold center>Frog UTC Parking</FUPText>
              </View>
              <View style={styles.circular}>
                <Animatable.View direction='reverse' useNativeDriver easing='linear' duration={30000} animation='rotate' iterationCount='infinite' style={styles.circularTextContainer}>
                  <CircularText circumference={250} text='UTC Frogs Only*Others Will Be Toad*' textStyle={{ medium: true, bold: true }} degOffset={45} />
                </Animatable.View>
                <Animatable.View useNativeDriver easing='linear' duration={10000} animation='rotate' iterationCount='infinite' style={styles.orbitContainer}>
                  <LottieView
                    progress={this.state.orbitProgress}
                    style={StyleSheet.absoluteFill}
                    source={orbit}
                  />
                </Animatable.View>
              </View>
              <View style={styles.descriptionContainer}>
                <FUPText dark center h6>An alternative to the parking application provided by University Towers</FUPText>
              </View>
            </FUPScrollView>
          </View>
          <View style={styles.slide}>
            <FUPScrollView scrollEnabled={false} contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.centeredView}>
                <FUPText dark center h6>An alternative to the parking application provided by University Towers</FUPText>
              </View>
            </FUPScrollView>
          </View>
          <View style={styles.slide}>
            <FUPScrollView scrollEnabled={false} contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.centeredView}>
                <FUPText dark center h6>An alternative to the parking application provided by University Towers</FUPText>
              </View>
            </FUPScrollView>
          </View>
          <View style={styles.slide}>
            <FUPScrollView scrollEnabled={false} contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.centeredView}>
                <FUPText dark center h6>An alternative to the parking application provided by University Towers</FUPText>
              </View>
            </FUPScrollView>
          </View>
        </ScrollView>
        <View style={styles.pagingContainer}>
          {
            [...new Array(this.state.numPages)]
              .map((_, index) => <View key={index} style={index <= this.state.page ? styles.filled : styles.unfilled} />)
          }
        </View>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  circular: {
    marginVertical: Metrics.doubleBaseMargin
  },
  circularTextContainer: {
    position: 'absolute',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  descriptionContainer: {
    width: '90%'
  },
  dot: {
    marginBottom: 3 * Metrics.baseMargin
  },
  filled: {
    backgroundColor: Colors.white,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5
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
  orbitContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pagingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  welcomeTextContainer: {
    marginTop: Metrics.doubleBaseMargin
  },
  wrapper: {
  },
  slide: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  unfilled: {
    backgroundColor: Colors.coolGrey,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5
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
