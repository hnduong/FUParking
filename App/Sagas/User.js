import { call, put, select } from 'redux-saga/effects'
import { path } from 'ramda'
import { AsyncStorage } from 'react-native'
import Immutable from 'immutable'

import Selectors from '../Utils/Selectors'
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
        const publicUser = path(['data'], getUserResponse)
        const user = {
          Permits: publicUser.Permits,
          Vehicles: publicUser.Vehicles,
          SID: authorizedUser.SID,
          ExpiresOn: authorizedUser.ExpiresOn,
          UserRoles: authorizedUser.UserRoles,
          OrganizationId: authorizedUser.OrganizationId,
          CallCenterPhoneNumber: publicUser.CallCenterPhoneNumber
        }
        AsyncStorage.multiSet([['FUParking_User', JSON.stringify(user)], ['FUParking_Credentials', JSON.stringify(credentials)]])
        yield put(UserActions.loginSuccess(user))
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
    yield AsyncStorage.multiRemove(['FUParking_User', 'FUParking_Credentials', 'FUParking_Permit'])
  } catch (error) {
    yield put(AppActions.updateRoot('authentication'))
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
            AsyncStorage.setItem('FUParking_Permit', JSON.stringify(permit))
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
