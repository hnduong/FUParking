
import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'
import { Fonts, App } from '../Theme'

const styles = StyleSheet.create({
  ...App.theme
})

const FUPText = props => {
  let letterSpacing = props.letterSpacing ? { letterSpacing: props.letterSpacing } : { letterSpacing: 0 }
  let fontFamily = props.bold ? { fontFamily: Fonts.type.bold } : { fontFamily: Fonts.type.base }
  let theme = props.light ? 'light' : 'dark'
  let textColor = styles[`${theme}Text`]
  if (props.subtitle) fontFamily = { fontFamily: Fonts.type.subtitle }
  let textSize = { fontSize: Fonts.size.regular }
  if (props.medium) textSize = { fontSize: Fonts.size.medium }
  if (props.small) textSize = { fontSize: Fonts.size.small }
  if (props.color) textColor = { color: props.color }
  const customTextStyles = props.style || {}
  const textStyles = StyleSheet.flatten([fontFamily, textColor, textSize, letterSpacing, customTextStyles])
  return (
    <Text style={textStyles}>{props.text || props.children}</Text>
  )
}

FUPText.defaultProps = {
  text: '',
  children: ''
}

FUPText.propTypes = {
  letterSpacing: PropTypes.number,
  text: PropTypes.string,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  light: PropTypes.bool,
  subtitle: PropTypes.bool,
  bold: PropTypes.bool
}

export default FUPText
