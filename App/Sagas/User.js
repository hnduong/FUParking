import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import { AsyncStorage } from 'react-native'

import UserActions from '../Redux/User'
import AppActions from '../Redux/App'

function * login (authorizeApi, getUserApi, action) {
  try {
    const { credentials } = action
    const authorizeResponse = yield call(authorizeApi, credentials)
    if (authorizeResponse.ok) {
      const authorizedUser = path(['data'], authorizeResponse)
      const getUserResponse = yield call(getUserApi, { SID: authorizedUser.SID })
      if (getUserResponse.ok) {
        AsyncStorage.setItem('FUParking_Credentials', JSON.stringify(credentials))
        const permits = path(['data', 'Permits'], getUserResponse)
        const vehicles = path(['data', 'Vehicles'], getUserResponse)
        yield put(UserActions.loginSuccess({ permits, vehicles }))
        yield put(AppActions.updateRoot('authenticated'))
      }
    }
  } catch (error) {
    yield put(AppActions.updateRoot('authentication'))
  }
}

function * logout (action) {
  try {
    yield put(AppActions.updateRoot('authentication'))
  } catch (error) {
    yield put(AppActions.updateRoot('authentication'))
  }
}

export default {
  login,
  logout
}
