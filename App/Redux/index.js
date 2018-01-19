import { combineReducers } from 'redux'

import { reducer as App } from './App'
import { reducer as User } from './User'

import configureStore from './ConfigureStore'

export default () => {
  const rootReducer = combineReducers({
    App,
    User
  })

  return configureStore(rootReducer)
}
