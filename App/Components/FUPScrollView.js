import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'

import { Metrics, App } from '../Theme'

const styles = StyleSheet.create({
  ...App.screen,
  ...App.layout
})

class FUPScrollView extends React.Component {
  renderScrollView = () => {
    return (
      <KeyboardAwareScrollView
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'none'}
        enableResetScrollToCoords={false}
        extraScrollHeight={Metrics.navBarHeight}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.container}
        {...this.props}
      >
        {this.props.children}
      </KeyboardAwareScrollView>
    )
  }

  render () {
    if (this.props.linearGradient) {
      return (
        <LinearGradient
          colors={[this.props.colorTop, this.props.colorMiddle, this.props.colorBottom]}
          style={[styles.flex, this.props.underHeader && styles.underHeader]}
        >
          {this.renderScrollView()}
        </LinearGradient>
      )
    }
    return this.renderScrollView()
  }
}

FUPScrollView.defaultProps = {
  linearGradient: true,
  underHeader: false,
  colorTop: '#FEAC5E',
  colorMiddle: '#C779D0',
  colorBottom: '#4BC0C8'
}

export default FUPScrollView
