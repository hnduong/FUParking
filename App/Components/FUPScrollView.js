import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Metrics, App } from '../Theme'

const styles = StyleSheet.create({
  ...App.screen
})

class FUPScrollView extends React.Component {
  render () {
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
}

export default FUPScrollView
