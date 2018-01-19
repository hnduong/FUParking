import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import FUPSagas from '../Sagas'

const sagaMiddleware = createSagaMiddleware()

export default (rootReducer) => {
  const middleware = [logger, sagaMiddleware]
  const enhancers = []
  enhancers.push(applyMiddleware(...middleware))
  const store = createStore(rootReducer, compose(...enhancers))
  sagaMiddleware.run(FUPSagas)
  return store
}
