import { put } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'

import AppActions from '../Redux/App'
import UserActions from '../Redux/User'

import Config from '../config'

function * startup (authorizeApi, getUserApi, action) {
  try {
    const [rawCredentials, rawUser] = yield AsyncStorage.multiGet(['FUParking_Credentials', 'FUParking_User'])
    const credentials = JSON.parse(rawCredentials[1])
    const user = JSON.parse(rawUser[1])
    const expires = user.ExpiresOn.match(/\d/g).join('')
    const isExpired = new Date() > new Date(expires - Config.expirationBuffer)
    if (!isExpired) {
      yield put(UserActions.loginSuccess(user))
      yield put(AppActions.updateRoot('authenticated'))
    } else {
      yield put(UserActions.loginRequest(credentials))
    }
  } catch (error) {
    yield put(AppActions.updateRoot('authentication'))
  }
}

export default {
  startup
}
