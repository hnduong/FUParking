import React from 'react'
import Lottie from 'lottie-react-native'
import * as Animatable from 'react-native-animatable'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'

const menuJSON = require('../Resources/Lottie/menu3.json')

class MenuButton extends React.Component {
  state = {
    progress: new Animated.Value(0)
  }

  componentDidMount () {
    Animated.timing(this.state.progress, {
      toValue: 0.5,
      duration: 2000
    }).start()
    this.animatedView.slideInLeft(1000)
  }

  handleOnPress = () => {
    Animated.sequence([
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 200
      })
    ]).start()
    setTimeout(() => {
      this.setState({ progress: new Animated.Value(0.5) })
    }, 200)
  }
  render () {
    return (
      <TouchableOpacity
        style={[styles.button]}
        onPress={this.handleOnPress}
      >
        <Animatable.View
          ref={(ref) => { this.animatedView = ref }}
          style={[StyleSheet.absoluteFill]}
        >
          <Lottie
            style={[StyleSheet.absoluteFill]}
            progress={this.state.progress}
            source={menuJSON}
            loop={false}
            speed={1}
            enableMergePathsAndroidForKitKatAndAbove
          />
        </Animatable.View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: 34,
    height: 34,
    justifyContent: 'center'
  }
})

export default MenuButton
