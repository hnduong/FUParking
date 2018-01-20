
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
  if (props.bold) fontFamily = { fontFamily: Fonts.type.bold }
  if (props.h1) textSize = { fontSize: Fonts.size.h1 }
  if (props.h2) textSize = { fontSize: Fonts.size.h2 }
  if (props.h3) textSize = { fontSize: Fonts.size.h3 }
  if (props.h4) textSize = { fontSize: Fonts.size.h4 }
  if (props.h5) textSize = { fontSize: Fonts.size.h5 }
  if (props.h6) textSize = { fontSize: Fonts.size.h6 }
  if (props.tiny) textSize = { fontSize: Fonts.size.tiny }
  if (props.medium) textSize = { fontSize: Fonts.size.medium }
  if (props.small) textSize = { fontSize: Fonts.size.small }
  if (props.color) textColor = { color: props.color }
  const customTextStyles = props.style || {}
  if (props.center) customTextStyles.textAlign = 'center'
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
