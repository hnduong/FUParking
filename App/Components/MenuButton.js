import React from 'react'
import Lottie from 'lottie-react-native'
import { StyleSheet, TouchableOpacity } from 'react-native'

const menuJSON = require('../Resources/Lottie/menu.json')

class MenuButton extends React.Component {
  handleOnPress = () => {
    this.animation.play()
  }
  render () {
    return (
      <TouchableOpacity
        style={[styles.button]}
        onPress={this.handleOnPress}
      >
        <Lottie
          style={[StyleSheet.absoluteFill]}
          ref={animation => { this.animation = animation }}
          source={menuJSON}
          loop={false}
          speed={2}
          enableMergePathsAndroidForKitKatAndAbove
        />
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
