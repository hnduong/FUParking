import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

import { Colors, Metrics, Fonts } from '../Theme'

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: Metrics.inputHeight,
    padding: Metrics.smallMargin,
    textAlign: 'left',
    fontFamily: 'Roboto',
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: Colors.background,
    color: Colors.text,
    fontSize: Fonts.size.input
  }
})

class FUPInput extends React.Component {
  static defaultProps = {
    placeholder: 'Placeholder',
    placeholderTextColor: Colors.coolGrey,
    underlineColorAndroid: 'transparent',
    autoCapitalize: 'none',
    returnKeyType: 'next',
    autoCorrect: false
  }

  focus () {
    this.selfInput.focus()
  }

  blur () {
    this.selfInput.blur()
  }

  instance () {
    return this.selfInput
  }

  render () {
    return (
      <TextInput
        ref={input => { this.selfInput = input }}
        {...this.props}
        style={[styles.textInput, this.props.style]}
      />
    )
  }
}

export default FUPInput
