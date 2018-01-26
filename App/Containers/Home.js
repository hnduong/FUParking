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
      ...this.state,
      permit: 0
    }
  }

  handleSubmit = () => {
    const { space } = this.state.inputs
    if (space) {
      const permits = Immutable.toJS(this.props.user.get('Permits'))
      const permit = permits[0]
      const vehicles = Immutable.toJS(this.props.user.get('Vehicles'))
      const vehicle = vehicles[0]
      this.props.getPermit(space, permit, vehicle.LicensePlate)
    }
  }

  handleSelectedPermit = (itemValue, itemIndex) => {
    const permit = this.props.user.get('Permits').toJS()[itemIndex]
    this.setState({ permit })
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <FUPScrollView>
          <View style={styles.section}>
            <FUPInput
              placeholder='Space'
              onChangeText={this.inputOnChangeText('space')}
              maxLength={4}
              autoCapitalize='characters'
            />
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
  getPermit: (space, permit, licensePlate) => dispatch(UserActions.getPermitRequest(space, permit, licensePlate))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
