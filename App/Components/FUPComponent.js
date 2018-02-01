import React from 'react'

class FUPComponent extends React.Component {
  static navigatorStyle = {
    statusBarHidden: false,
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    topBarElevationShadowEnabled: false
  }

  state = {
    inputs: {}
  }
  toggleDrawer = () => this.props.navigator && this.props.navigator.toggleDrawer({ side: 'left', animated: true })
  goBack = () => this.props.navigator && this.props.navigator.pop({ animated: true, animationType: 'fade' })
  navigate = (screen, props) => this.props.navigator && this.props.navigator.push({ screen, passProps: props })
  resetTo = (screen, props) => this.props.navigator && this.props.navigator.resetTo({ screen, passProps: props })
  switchToTab = (index) => this.props.navigator && this.props.navigator.switchToTab({ tabIndex: index })

  inputOnChangeText = name => text =>
    this.setState({
      inputs: {
        ...this.state.inputs,
        [name]: text
      }
    })

  focusField = field => e => {
    if (this[field]) {
      this[field].focus()
    }
  }

  setRef = refName => ref => {
    if (ref && refName) {
      this[refName] = ref
    }
  }
}

export default FUPComponent
