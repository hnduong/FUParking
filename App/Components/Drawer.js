import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet } from 'react-native'

import FUPScrollView from './FUPScrollView'
import FUPComponent from './FUPComponent'

import UserActions from '../Redux/User'

class Drawer extends FUPComponent {
  handleLogout = () => {
    this.props.logout()
  }

  handleTab = (index) => () => {
    this.toggleDrawer()
    this.switchToTab(index)
  }

  render () {
    return (
      <FUPScrollView style={styles.drawer}>
        <Button title='Logout' onPress={this.handleLogout} />
        <Button title='Home' onPress={this.handleTab(1)} />
        <Button title='Available Spaces' onPress={this.handleTab(0)} />
        <Button title='Settings' onPress={this.handleTab(2)} />
      </FUPScrollView>
    )
  }
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: 'white'
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
