import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

const { Types, Creators } = createActions({
  updateStarted: ['started']
})

export const AppTypes = Types

export default Creators

export const INITIAL_STATE = fromJS({
  started: false
})

export const updateStarted = (state, { started }) =>
  state.merge({ started })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_STARTED]: updateStarted
})
