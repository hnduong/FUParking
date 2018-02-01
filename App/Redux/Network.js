import { createReducer } from 'reduxsauce'
import { fromJS } from 'immutable'

import { UserTypes } from './User'

/**
 * Example network request object to track what is currently making requests
{
  message: 'Messsssage',
  ...
}
 */

const networkRequestKeysMap = {
  login: 'login',
  getPermit: 'getPermit'
}

const networkRequestKeys = Object.keys(networkRequestKeysMap)

/**
 * Create initial state for the reducer
 */
const initialNetworkRequestState = networkRequestKeys
  .reduce((prev, curr) => Object.assign(prev, { [curr]: false }), {})

export const INITIAL_STATE = fromJS(initialNetworkRequestState)

export const updateRequesting = (networkKey) => (state) =>
  networkRequestKeys.indexOf(networkKey) > -1
    ? state.merge({ [networkKey]: true })
    : state

export const resetRequesting = (networkKey) => (state) =>
  networkRequestKeys.indexOf(networkKey) > -1
    ? state.merge({ [networkKey]: false })
    : state

export const reducer = createReducer(INITIAL_STATE, {
  [UserTypes.LOGIN_REQUEST]: updateRequesting(networkRequestKeys.login),
  [UserTypes.LOGIN_SUCCESS]: resetRequesting(networkRequestKeys.login),
  [UserTypes.LOGIN_ERROR]: resetRequesting(networkRequestKeys.login),
  [UserTypes.GET_PERMIT_ERROR]: resetRequesting(networkRequestKeys.getPermit)
})
