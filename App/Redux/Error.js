import { createReducer } from 'reduxsauce'
import { fromJS } from 'immutable'

import { UserTypes } from './User'

/**
 * Example error object
{
  message: 'Error processing the request',
  ...
}
 */

const errorKeysMap = {
  login: 'login',
  getPermit: 'getPermit'
}

const errorKeys = Object.keys(errorKeysMap)

/**
 * Create initial state for the reducer
 */
const initialErrorState = errorKeys
  .reduce((prev, curr) => Object.assign(prev, { [curr]: null }), {})

export const INITIAL_STATE = fromJS(initialErrorState)

export const updateError = (errorKey) => (state, { error }) =>
  errorKeys.indexOf(errorKey) > -1
  ? state.merge({ [errorKey]: error })
  : state

export const resetError = (errorKey) => (state) =>
  errorKeys.indexOf(errorKey) > -1
  ? state.merge({ [errorKey]: null })
  : state

export const reducer = createReducer(INITIAL_STATE, {
  [UserTypes.LOGIN_REQUEST]: resetError(errorKeys.login),
  [UserTypes.LOGIN_SUCCESS]: resetError(errorKeys.login),
  [UserTypes.LOGIN_ERROR]: updateError(errorKeys.login),
  [UserTypes.GET_PERMIT_ERROR]: updateError(errorKeys.getPermit)
})
