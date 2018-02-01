import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
// import MIcon from 'react-native-vector-icons'

import FUPInput from '../../Components/FUPInput'
import FUPComponent from '../../Components/FUPComponent'

import { App, Metrics, Fonts, Colors } from '../../Theme'

import UserActions from '../../Redux/User'

class Login extends FUPComponent {
  handleLogin = () => {
    const { email, password } = this.state.inputs
    this.props.login({ UID: email, Password: password, ApplicationDetails: null })
  }

  goToRegister = () => {
    this.navigate('Register')
  }

  render () {
    return (
      <LinearGradient colors={['#FEAC5E', '#C779D0', '#4BC0C8']} style={[styles.mainContainer]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={[styles.section, styles.inputContainer, styles.alignCenter, styles.width90]}>
            <FUPInput
              ref={this.setRef('email')}
              placeholder='Email'
              placeholderTextColor={Colors.gray}
              style={styles.input}
              onChangeText={this.inputOnChangeText('email')}
              onSubmitEditing={this.focusField('password')}
            />
          </View>
          <View style={[styles.section, styles.inputContainer, styles.alignCenter, styles.width90]}>
            <FUPInput
              ref={this.setRef('password')}
              secureTextEntry
              placeholder='Password'
              placeholderTextColor={Colors.gray}
              style={styles.input}
              onChangeText={this.inputOnChangeText('password')}
              returnKeyType='go'
              onSubmitEditing={this.handleLogin}
            />
          </View>
          <Button title='Login' onPress={this.handleLogin} />
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  ...App.screen,
  ...App.form,
  ...App.layout,
  ...App.theme,
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    color: Colors.gray
  },
  linearGradient: {
    flex: 1
  },
  welcomeText: {
    marginTop: Metrics.baseMargin,
    fontSize: Fonts.size.h4,
    color: 'white'
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(UserActions.loginRequest(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
