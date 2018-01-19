import { createReducer, createActions } from 'reduxsauce'
import { fromJS } from 'immutable'

const { Types, Creators } = createActions({
  startup: [],
  updateRoot: ['root'],
  updateStarted: ['started'],
  trackEvent: ['name', 'properties']
})

export const AppTypes = Types

export default Creators

export const INITIAL_STATE = fromJS({
  root: null,
  started: false,
  events: [] // keeps track of current session
})

export const updateRoot = (state, { root }) =>
  state.merge({ root })

export const updateStarted = (state, { started }) =>
  state.merge({ started })

export const trackEvent = (state, { name, properties }) =>
  state.updateIn(['events'], events => events.push(fromJS({ name, properties })))

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_ROOT]: updateRoot,
  [Types.UPDATE_STARTED]: updateStarted,
  [Types.TRACK_EVENT]: trackEvent
})
