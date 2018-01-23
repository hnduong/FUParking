import Analytics from 'appcenter-analytics'
import { select } from 'redux-saga/effects'

const getIsAnalyticsEnabled = state => state.App.isAnalyticsEnabled

function * track (action) {
  try {
    const { name, properties = {} } = action
    if (typeof name === 'string' && name.trim() !== '') {
      const enabled = yield select(getIsAnalyticsEnabled)
      if (enabled) {
        Analytics.trackEvent(name, properties)
      }
    }
  } catch (error) {

  }
}

export default {
  track
}
