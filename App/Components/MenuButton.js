import React from 'react'
import Lottie from 'lottie-react-native'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

const menuJSON = require('../Resources/Lottie/menu.json')

class MenuButton extends React.Component {
  componentDidMount () {
    
  }

  handleOnPress = () => {
    this.animation.play()
  }
  render () {
    return (
      <TouchableOpacity
        style={[styles.button, { borderWidth: 1 }]}
        onPress={this.handleOnPress}
      >
        <Lottie
          style={styles.button}
          ref={animation => {
            this.animation = animation
          }}
          source={menuJSON}
          loop={false}
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
