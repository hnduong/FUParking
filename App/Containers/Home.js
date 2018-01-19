import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, View } from 'react-native'

import FUPScrollView from '../Components/FUPScrollView'
import FUPComponent from '../Components/FUPComponent'
import FUPInput from '../Components/FUPInput'

import { App } from '../Theme'

class Home extends FUPComponent {

  handleSubmit = () => {
    const { space } = this.state.inputs
    if (space) {

    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <FUPScrollView>
          <FUPInput
            placeholder='Space'
            onChangeText={this.inputOnChangeText('space')}
          />
          <Button title='Submit' onPress={this.handleSubmit} />
        </FUPScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...App.screen,
  ...App.form
})

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
