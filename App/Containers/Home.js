import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, View, Picker, TouchableOpacity } from 'react-native'
import Immutable from 'immutable'
import { ButtonGroup, Card, Icon } from 'react-native-elements'

import { FUPScrollView, FUPInput, FUPComponent, FUPText } from '../Components'

import UserActions from '../Redux/User'

import { App } from '../Theme'

class Home extends FUPComponent {
  static navigatorStyle = {
    navBarHidden: false,
    topBarElevationShadowEnabled: false
  }

  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      groupIndex: 1,
      selectedRecentIndex: 0
    }
    this.setNavigatorToButtons({
      rightButtons: [
        {
          component: 'MenuButton',
          id: '22',
          showAsAction: 'always'
        }
      ]
    })
  }

  handleSubmit = () => {
    const { groupIndex } = this.state
    switch (groupIndex) {
      case 0:

        break
      case 1:
        break
      case 2:
        const { space } = this.state.inputs
        if (space) {
          const permits = Immutable.toJS(this.props.user.get('Permits'))
          const permit = permits[0]
          const vehicles = Immutable.toJS(this.props.user.get('Vehicles'))
          const vehicle = vehicles[0]
          this.props.getPermit(space, permit, vehicle.LicensePlate)
        }
        break
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
          ref={this.setRef('Input')}
          style={styles.input}
          placeholder='Space'
          autoCapitalize='characters'
          onChangeText={this.inputOnChangeText('space')}
        />
      </View>
    )
  }

  renderFavorite = () => {
    return (
      <View style={[styles.section]}>
        <FUPInput
          ref={this.setRef('favoriteInput')}
          style={styles.input}
          placeholder='Space'
          value='C387'
        />
      </View>
    )
  }

  updateSelectedRecentIndex = (index) => () => {
    this.setState({ selectedRecentIndex: index })
  }

  renderRecentSpace = (space, index) => {
    const isSelected = this.state.selectedRecentIndex === index
    return (
      <TouchableOpacity key={space} onPress={this.updateSelectedRecentIndex(index)}>
        <Card containerStyle={styles.card}>
          <View style={[styles.flex, styles.justifyBetween, styles.flexRow]}>
            <FUPText light h6>{space}</FUPText>
            {isSelected && <Icon name='check' />}
          </View>
        </Card>
      </TouchableOpacity>
    )
  }

  renderRecent = () => {
    const { recent } = this.props
    return (
      <View style={[styles.section]}>
        {recent.map(this.renderRecentSpace)}
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
              containerStyle={styles.buttonGroup}
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
  ...App.form,
  ...App.layout,
  buttonGroup: {
    marginLeft: 0,
    marginRight: 0
  },
  card: {
    marginLeft: 0,
    marginRight: 0
  },
  input: {
    textAlign: 'center',
    paddingLeft: 0,
    borderWidth: 1
  }
})

const mapStateToProps = state => ({
  user: state.User.get('user'),
  recent: state.User.get('recent'),
  permit: state.User.get('permit')
})

const mapDispatchToProps = dispatch => ({
  getPermit: (space, permit, licensePlate) => dispatch(UserActions.getPermitRequest(space, permit, licensePlate))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
