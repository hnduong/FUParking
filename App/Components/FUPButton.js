import React from 'react'
import { TouchableOpacity } from 'react-native'

import FUPText from './FUPText'

class FUPButton extends React.PureComponent {
  render () {
    return (
      <TouchableOpacity {...this.props}>
        {this.props.children}
        {this.props.text && <FUPText {...this.props.textStyle}>{this.props.text}</FUPText>}
      </TouchableOpacity>
    )
  }
}

export default FUPButton
