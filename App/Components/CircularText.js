import React from 'react'
import { StyleSheet, View } from 'react-native'

import FUPText from './FUPText'

const styles = StyleSheet.create({
  circle: { position: 'absolute' }
})

class CircularText extends React.PureComponent {
  render () {
    const { text, circumference, degOffset, textStyle } = this.props
    const arr = [...text]
    const deg = 360 / arr.length
    return arr.map((char, index) => {
      const transform = [{ rotate: `${(deg * index) - degOffset}deg` }]
      const circleStyle = { transform, height: circumference }
      return (
        <View key={index} style={[styles.circle, circleStyle]}>
          <FUPText {...textStyle}>{char}</FUPText>
        </View>
      )
    })
  }
}

CircularText.defaultProps = {
  text: 'Wow, a circle',
  degOffset: 0,
  circumference: 250
}

export default CircularText
