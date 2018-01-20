import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

const { Types, Creators } = createActions({
  updateUser: ['user'],

  loginRequest: ['credentials'],
  loginFailure: ['error'],
  loginSuccess: ['user'],

  logout: [],

  getPermitRequest: ['space'],
  getPermitFailure: ['error'],
  getPermitSuccess: ['permit']
})

export const UserTypes = Types

export default Creators

export const INITIAL_STATE = fromJS({
  user: null,
  permit: null
})

export const updateUser = (state, { user }) =>
  state.merge({ user })

export const loginSuccess = (state, { user }) =>
  state.merge({ user })

export const getPermitSuccess = (state, { permit }) =>
  state.merge({ permit })

export const logout = state => INITIAL_STATE

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_USER]: updateUser,

  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGOUT]: logout,

  [Types.GET_PERMIT_SUCCESS]: getPermitSuccess

})
