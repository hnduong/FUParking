/**
 * Returns the current redux store state
 */
const getState = state => state

const getRoot = state => state.App.get('root')

export default {
  getState,
  getRoot
}
