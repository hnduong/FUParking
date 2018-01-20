import { all, takeLatest } from 'redux-saga/effects'

import { UserTypes } from '../Redux/User'
import { AppTypes } from '../Redux/App'

import UserSagas from './User'
import FrogParkingApi from '../Api/FrogParking'

import AppSagas from './App'

export default function * root () {
  yield all([
    takeLatest(AppTypes.STARTUP, AppSagas.startup),

    takeLatest(UserTypes.LOGIN_REQUEST, UserSagas.login, FrogParkingApi.authorize, FrogParkingApi.getPublicUserAccountsDetails),
    takeLatest(UserTypes.LOGOUT, UserSagas.logout),

    takeLatest(UserTypes.GET_PERMIT_REQUEST, UserSagas.getPermit, FrogParkingApi.getPermit)

  ])
}
