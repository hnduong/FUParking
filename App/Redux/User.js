import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

const { Types, Creators } = createActions({
  updateUser: ['user'],

  loginRequest: ['credentials'],
  loginError: ['error'],
  loginSuccess: ['user'],

  logout: [],

  getPermitRequest: ['space', 'permit', 'vehicle'],
  getPermitError: ['error'],
  getPermitSuccess: ['permit'],

  updatePermit: ['permit'],
  updateRecent: ['recent']
})

export const UserTypes = Types

export default Creators

export const INITIAL_STATE = fromJS({
  user: null,
  permit: null,
  recent: []
})

export const updateUser = (state, { user }) =>
  state.merge({ user })

export const loginSuccess = (state, { user }) =>
  state.merge({ user })

export const getPermitSuccess = (state, { permit }) =>
  state.merge({ permit })

export const updatePermit = (state, { permit }) =>
  state.merge({ permit })

export const updateRecent = (state, { recent }) =>
  state.merge({ recent })

export const logout = state => INITIAL_STATE

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_USER]: updateUser,

  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGOUT]: logout,

  [Types.GET_PERMIT_SUCCESS]: getPermitSuccess,
  [Types.UPDATE_PERMIT]: updatePermit,
  [Types.UPDATE_RECENT]: updateRecent
})
