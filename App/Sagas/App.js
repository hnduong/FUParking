import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import { AsyncStorage } from 'react-native'

import AppActions from '../Redux/App'

function * startup (authorizeApi, getUserApi, action) {
  try {
    const value = yield AsyncStorage.getItem('FUParking_Credentials')
    console.log(value)
    // const credentials = JSON.parse(value)
    // yield put({ type: 'LOGIN_REQUEST', credentials })
    yield put(AppActions.updateRoot('authenticated'))
  } catch (error) {
    yield put(AppActions.updateRoot('authentication'))
  }
}

export default {
  startup
}
