import { combineReducers } from 'redux'

import { reducer as App } from './App'
import { reducer as User } from './User'
import { reducer as Network } from './Network'
import { reducer as Error } from './Error'

import configureStore from './ConfigureStore'

export default () => {
  const rootReducer = combineReducers({
    App,
    User,
    Error,
    Network
  })

  return configureStore(rootReducer)
}
