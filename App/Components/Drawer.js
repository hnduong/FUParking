import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet } from 'react-native'

import FUPScrollView from './FUPScrollView'

import UserActions from '../Redux/User'

class Drawer extends React.PureComponent {
  handleLogout = () => {
    this.props.logout()
  }

  render () {
    return (
      <FUPScrollView style={{ backgroundColor: 'red' }}>
        <Button title='Logout' onPress={this.handleLogout} />
      </FUPScrollView>
    )
  }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
