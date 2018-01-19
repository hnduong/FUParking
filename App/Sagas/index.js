import { all, takeLatest } from 'redux-saga/effects'

import { UserTypes } from '../Redux/User'
import { AppTypes } from '../Redux/App'

import UserSagas from './User'
import UserApi from '../Api/User'

export default function * root () {
  yield all([

    takeLatest(UserTypes.LOGIN_REQUEST, UserSagas.login, UserApi.login),
    takeLatest(UserTypes.LOGOUT, UserSagas.logout)

  ])
}
