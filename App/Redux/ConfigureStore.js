import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import FUPSagas from '../Sagas'
import ReactotronConfig from '../reactotron'

__DEV__ && ReactotronConfig.startReactotron()

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null
const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

export default (rootReducer) => {
  const middleware = [sagaMiddleware]
  const enhancers = []
  enhancers.push(applyMiddleware(...middleware))
  const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))
  sagaMiddleware.run(FUPSagas)
  return store
}
