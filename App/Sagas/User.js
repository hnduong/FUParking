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
    yield AsyncStorage.multiRemove(['FUParking_User', 'FUParking_Credentials'])
  } catch (error) {
    yield put(AppActions.updateRoot('authentication'))
  }
}

function * getPermit (checkBayApi, getPermitApi, applyPermitApi, action) {
  try {
    const { space } = action
    const state = yield select(Selectors.getState)
    console.log(Immutable.toJS(state.App))
  } catch (error) {

  }
}

export default {
  login,
  logout,
  getPermit
}
