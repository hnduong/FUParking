import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, View, Picker } from 'react-native'
import Immutable from 'immutable'
import { ButtonGroup } from 'react-native-elements'

import { FUPScrollView, FUPInput, FUPComponent, FUPText } from '../Components'

import UserActions from '../Redux/User'

import { App, Fonts } from '../Theme'

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
      permit: 0,
      groupIndex: 1
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

  renderPickerItem = (p, index) => (
    <Picker.Item key={index} label={`${p.PermitPrefix}-${p.PermitNumber}`} value={index} />
  )

  updateIndex = (index) => {
    this.setState({ groupIndex: index })
  }

  renderCustom = () => {
    return (
      <View style={[styles.section]}>
        <FUPInput
          style={{ textAlign: 'center', paddingLeft: 0, borderWidth: 1 }}
          placeholder='Space'
          onChangeText={this.inputOnChangeText('space')}
        />
      </View>
    )
  }

  renderFavorite = () => {
    return (
      <View style={[styles.section]}>
        <FUPInput
          style={{ textAlign: 'center', paddingLeft: 0, borderWidth: 1 }}
          placeholder='Space'
          value='C387'
          onChangeText={this.inputOnChangeText('space')}
        />
      </View>
    )
  }

  renderRecent = () => {
    return (
      <View style={[styles.section]}>
        <FUPText light h1>fdsf</FUPText>
      </View>
    )
  }

  renderView = () => {
    switch (this.state.groupIndex) {
      case 0:
        return this.renderRecent()
      case 1:
        return this.renderFavorite()
      case 2:
      default:
        return this.renderCustom()
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <FUPScrollView>
          <View style={[styles.section]}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={this.state.groupIndex}
              buttons={['Recent', 'Favorite', 'Custom']}
              containerStyle={{ marginLeft: 0, marginRight: 0 }}
            />
          </View>
          {this.renderView()}
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
