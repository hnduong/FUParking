import { put } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import Analytics from 'appcenter-analytics'

import AppActions from '../Redux/App'
import UserActions from '../Redux/User'

import Config from '../config'

function * startup (authorizeApi, getUserApi, action) {
  try {
    const [rawCredentials, rawUser, rawPermit] = yield AsyncStorage.multiGet(['FUParking_Credentials', 'FUParking_User', 'FUParking_Permit'])
    const credentials = JSON.parse(rawCredentials[1])
    const user = JSON.parse(rawUser[1])
    const permit = JSON.parse(rawPermit[1])
    const expires = user.ExpiresOn.match(/\d/g).join('')
    const isExpired = new Date() > new Date(expires - Config.expirationBuffer)
    if (!isExpired) {
      yield put(UserActions.loginSuccess({ ...user, ...credentials, Permit: permit }))
      yield put(AppActions.updateRoot('authenticated'))
    } else {
      yield put(UserActions.loginRequest({ ...user, ...credentials, Permit: permit }))
    }
    const analyticsEnabled = yield Analytics.isEnabled()
    yield put(AppActions.updateIsAnalyticsEnabled(analyticsEnabled))
    if (analyticsEnabled) {
      yield put({ type: 'TRACK_EVENT', name: 'Opened App' })
    } else {
      yield Analytics.setEnabled(true)
    }
  } catch (error) {
    const analyticsEnabled = yield Analytics.isEnabled()
    yield put(AppActions.updateIsAnalyticsEnabled(analyticsEnabled))
    if (analyticsEnabled) {
      yield put({ type: 'TRACK_EVENT', name: 'Opened App' })
    } else {
      yield Analytics.setEnabled(true)
    }
    yield put(AppActions.updateRoot('authentication'))
  }
}

export default {
  startup
}
