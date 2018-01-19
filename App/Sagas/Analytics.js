import Analytics from 'appcenter-analytics'

function * track (action) {
  try {
    const { name, properties = {} } = action
    if (typeof name === 'string' && name.trim() !== '') {
      Analytics.trackEvent(name, properties)
    }
  } catch (error) {

  }
}

export default {
  track
}
