import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, View } from 'react-native'

import FUPInput from '../../Components/FUPInput'
import FUPScrollView from '../../Components/FUPScrollView'
import FUPComponent from '../../Components/FUPComponent'

import { App } from '../../Theme'

import UserActions from '../../Redux/User'

class Login extends FUPComponent {

  handleLogin = () => {
    const { email, password } = this.state.inputs
    this.props.login({ UID: email, Password: password, ApplicationDetails: null })
  }

  goToRegister = () => {
    this.navigate('FUParking.Register')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <FUPScrollView scrollEnabled={false}>
          <View style={[styles.section, styles.inputContainer]}>
            <FUPInput
              ref={this.setRef('email')}
              placeholder='Email'
              style={styles.input}
              onChangeText={this.inputOnChangeText('email')}
            />
          </View>
          <View style={[styles.section, styles.inputContainer]}>
            <FUPInput
              ref={this.setRef('password')}
              secureTextEntry
              placeholder='Password'
              style={styles.input}
              onChangeText={this.inputOnChangeText('password')}
            />
          </View>
          <Button title='Login' onPress={this.handleLogin} />
          <Button title='Register' onPress={this.goToRegister} />
        </FUPScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...App.screen,
  ...App.form,
  input: {
    borderBottomWidth: 1
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(UserActions.loginRequest(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
