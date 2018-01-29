import { put } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import Analytics from 'appcenter-analytics'

import AppActions from '../Redux/App'
import UserActions from '../Redux/User'

import Config from '../config'

function * startup (authorizeApi, getUserApi, action) {
  try {
    const [rawCredentials, rawUser, rawPermit, rawRecent] = yield AsyncStorage.multiGet([Config.storageKeys.Credentials, Config.storageKeys.User, Config.storageKeys.Permit, Config.storageKeys.Recent])
    const credentials = JSON.parse(rawCredentials[1])
    const user = JSON.parse(rawUser[1])
    const permit = JSON.parse(rawPermit[1])
    const recent = JSON.parse(rawRecent[1])
    const expires = user.ExpiresOn.match(/\d/g).join('')
    const isExpired = new Date() > new Date(expires - Config.expirationBuffer)
    if (!isExpired) {
      yield put(UserActions.updateUser({ ...user, ...credentials }))
      if (permit) yield put(UserActions.updatePermit(permit))
      if (Array.isArray(recent)) yield put(UserActions.updateRecent(recent))
      yield put(AppActions.updateRoot(Config.root.Authenticated))
    } else {
      yield put(UserActions.loginRequest(credentials))
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
    yield put(AppActions.updateRoot(Config.root.Authentication))
  }
}

export default {
  startup
}
