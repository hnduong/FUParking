import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import { AsyncStorage } from 'react-native'

import UserActions from '../Redux/User'

function * login (api, action) {
  try {
    const { credentials } = action
    const response = yield call(api, credentials)

  } catch (error) {

  }
}

function * logout (action) {

}

export default {
  login,
  logout
}
