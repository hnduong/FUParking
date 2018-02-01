import { call, put, select } from 'redux-saga/effects'
import { path } from 'ramda'
import { AsyncStorage } from 'react-native'
import Immutable from 'immutable'

import Selectors from '../Utils/Selectors'
import UserActions from '../Redux/User'
import AppActions from '../Redux/App'

import Config from '../config'

function * login (authorizeApi, getUserApi, action) {
  try {
    const { credentials } = action
    const authorizeResponse = yield call(authorizeApi, credentials)
    if (authorizeResponse.ok) {
      const authorizedUser = path(['data'], authorizeResponse)
      const getUserResponse = yield call(getUserApi, { SID: authorizedUser.SID })
      if (!getUserResponse.ok) {
        const error = { response: getUserResponse }
        throw error
      }
      const publicUser = path(['data'], getUserResponse)
      const user = {
        UID: credentials.UID,
        Permits: publicUser.Permits,
        Vehicles: publicUser.Vehicles,
        SID: authorizedUser.SID,
        ExpiresOn: authorizedUser.ExpiresOn,
        UserRoles: authorizedUser.UserRoles,
        OrganizationId: authorizedUser.OrganizationId,
        CallCenterPhoneNumber: publicUser.CallCenterPhoneNumber
      }
      AsyncStorage.multiSet([
        [Config.storageKeys.User, JSON.stringify(user)],
        [Config.storageKeys.Credentials, JSON.stringify(credentials)]
      ])
      const [rawPermit, rawRecent] = yield AsyncStorage.multiGet([Config.storageKeys.Permit, Config.storageKeys.Recent])
      const recent = JSON.parse(rawRecent[1])
      const permit = JSON.parse(rawPermit[1])
      const expires = permit.ExpiresOn.match(/\d/g).join('')
      const isExpired = new Date() > new Date(expires - Config.expirationBuffer)
      if (!isExpired) yield put(UserActions.updatePermit(permit))
      if (Array.isArray(recent)) yield put(UserActions.updateRecent(recent))
      yield put(UserActions.loginSuccess(user))
      yield put(AppActions.updateRoot(Config.root.Authenticated))
    }
  } catch (error) {
    if (error.response) {
      yield put(UserActions.loginError({ message: 'Please check that your credentials have been entered correctly.', credentials: action.credentials }))
    }
    yield put(AppActions.updateRoot(Config.root.Authentication))
  }
}

function * logout (action) {
  try {
    yield put(AppActions.updateRoot(Config.root.Authentication))
    yield AsyncStorage.multiRemove([
      Config.storageKeys.User,
      Config.storageKeys.Credentials,
      Config.storageKeys.Permit
    ])
  } catch (error) {
    yield put(AppActions.updateRoot(Config.root.Authentication))
  }
}

function * getPermit (checkBayApi, getPermitApi, applyPermitApi, action) {
  try {
    const { space, permit, vehicle } = action
    if (typeof space === 'string' && space.trim().length > 0) {
      const BayName = space.trim()
      const state = yield select(Selectors.getState)
      const User = Immutable.toJS(state.User)
      const { user } = User
      const { SID, UID: Email } = user
      const bay = {
        SID,
        ApplicationDetails: null,
        BayName
      }
      const checkBayResponse = yield call(checkBayApi, bay)
      if (checkBayResponse.ok) {
        const requestedPermit = {
          SID,
          ApplicationDetails: null,
          PermitPrefix: permit.PermitPrefix,
          PermitNumber: permit.PermitNumber,
          UniqueName: BayName,
          VehicleRegistrationNumber: vehicle
        }
        const getPermitResponse = yield call(getPermitApi, requestedPermit)
        if (getPermitResponse.ok) {
          const permitToApply = {
            SID,
            PermitPrefix: permit.PermitPrefix,
            PermitNumber: permit.PermitNumber,
            Email,
            BayName,
            VehicleRegistrationNumber: vehicle,
            ApplicationDetails: null
          }
          const applyPermitResponse = yield call(applyPermitApi, permitToApply)
          if (applyPermitResponse.ok) {
            const permit = getPermitResponse.data.PermitDetails
            yield put(UserActions.getPermitSuccess(permit))
            let rawRecentlyParkedSpaces = yield AsyncStorage.getItem(Config.storageKeys.Recent)
            let RecentlyParkedSpaces = JSON.parse(rawRecentlyParkedSpaces)
            if (!Array.isArray(RecentlyParkedSpaces)) RecentlyParkedSpaces = []
            RecentlyParkedSpaces = RecentlyParkedSpaces.filter(s => s !== BayName)
            RecentlyParkedSpaces.unshift(BayName)
            const recentlyParked5Spaces = RecentlyParkedSpaces.slice(0, 5)
            yield put(UserActions.updateRecent(Immutable.fromJS(recentlyParked5Spaces)))
            AsyncStorage.setItem(Config.storageKeys.Permit, JSON.stringify(permit))
            AsyncStorage.setItem(Config.storageKeys.Recent, JSON.stringify(recentlyParked5Spaces))
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default {
  login,
  logout,
  getPermit
}
