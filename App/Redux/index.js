import { combineReducers } from 'redux'

import { reducer as App } from './App'

import configureStore from './ConfigureStore'

export default () => {
  const rootReducer = combineReducers({
    App
  })
  return configureStore(rootReducer)
}
