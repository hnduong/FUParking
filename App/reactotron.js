import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking
} from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

import Immutable from 'immutable'

const startReactotron = () => {
  Reactotron
    .configure({
      name: 'FUParking'
    })
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(overlay())
    .use(asyncStorage())
    .use(networking())
    .use(sagaPlugin())
    .use(reduxPlugin({ onRestore: Immutable }))
    .connect()

  const log = console.log

  console.log = (...args) => {
    log(...args)
    Reactotron.log(...args)
  }

  console.tron = Reactotron

  Reactotron.clear()
}

export default {
  startReactotron
}
