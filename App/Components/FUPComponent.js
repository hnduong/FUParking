import React from 'react'

class FUPComponent extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    inputs: {}
  }

  goBack = () => this.props.navigator.pop({ animated: true, animationType: 'fade' })
  navigate = (screen, props) => this.props.navigator.push({ screen, passProps: props })

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
