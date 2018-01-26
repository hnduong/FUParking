import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, View, Picker } from 'react-native'
import Immutable from 'immutable'
import Voice from 'react-native-voice'

import FUPScrollView from '../Components/FUPScrollView'
import FUPComponent from '../Components/FUPComponent'
import FUPInput from '../Components/FUPInput'

import UserActions from '../Redux/User'

import { App } from '../Theme'

class Home extends FUPComponent {
  static navigatorStyle = {
    navBarHidden: false,
    topBarElevationShadowEnabled: false
  }
  static navigatorButtons = {
    leftButtons: [
      {
        component: 'FUParking.MenuButton',
        id: '22',
        showAsAction: 'always'
      }
    ]
  };

  constructor (props) {
    super(props)
    this.state = {
      permit: 0,
      recording: false
    }
    Voice.onSpeechStart = this.onSpeechStartHandler
    Voice.onSpeechEnd = this.onSpeechEndHandler
    Voice.onSpeechResults = this.onSpeechResultsHandler
  }

  handleSubmit = () => {
    const { space } = this.state.inputs
    if (space) {
      this.props.getPermit(space)
    }
  }

  handleSelectedPermit = (itemValue, itemIndex) => {
    const permit = this.props.user.get('Permits').toJS()[itemIndex]
    this.setState({ permit })
  }

  voiceStart = () => {
    Voice.start('en-US')
  }

  voiceStop = () => {
    Voice.stop()
  }

  onSpeechStartHandler = (event) => {
    this.setState({ recording: true })
  }

  onSpeechResultsHandler = (event) => {
    console.log(event.value[0])
  }

  onSpeechEndHandler = (event) => {
    this.setState({ recording: false })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <FUPScrollView>
          <View style={styles.section}>
            <FUPInput
              placeholder='Space'
              onChangeText={this.inputOnChangeText('space')}
            />
            <Button title={this.state.recording ? 'Stop' : 'Speak'} onPress={this.state.recording ? this.voiceStop : this.voiceStart} />
          </View>
          <View style={[styles.section]}>
            <Picker
              selectedValue={this.state.permit}
              onValueChange={this.handlePickedpermit}
            >
              {
                this.props.user.get('Permits')
                  .map(Immutable.toJS)
                  .map((p, index) => <Picker.Item key={index} label={`${p.PermitPrefix}-${p.PermitNumber}`} value={index} />)
              }
            </Picker>
          </View>
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
  user: state.User.get('user')
})

const mapDispatchToProps = dispatch => ({
  getPermit: space => dispatch(UserActions.getPermitRequest(space))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
