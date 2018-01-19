import { all, takeLatest } from 'redux-saga/effects'

import { UserTypes } from '../Redux/User'
import { AppTypes } from '../Redux/App'

import UserSagas from './User'
import UserApi from '../Api/User'

import AppSagas from './App'

export default function * root () {
  yield all([
    takeLatest(AppTypes.STARTUP, AppSagas.startup),

    takeLatest(UserTypes.LOGIN_REQUEST, UserSagas.login, UserApi.authorize, UserApi.getPublicUserAccountsDetails),
    takeLatest(UserTypes.LOGOUT, UserSagas.logout)

  ])
}
