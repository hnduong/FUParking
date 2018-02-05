import { Linking } from 'react-native'

/**
 * Computes the distance two geolocation and returns the miles between
 * `({ latitude: 123, longitude: 321 }, { latitude: 123, longitude: 321 }) => 0 `
 * `([321, 123], [321, 123]) => 0`
 * @param {Object|Array<Number>} c1 - coordinates, may be giving as an array or object
 * @param {Number} c1.latitude
 * @param {Number} c1.longitude
 * @param {Object|Array} c2 - coordinates
 * @param {Number} c2.latitude
 * @param {Number} c2.longitude
 * @param {Integer} accuracy - Floating point precision
 */
export const computeCoordinateDistance = (c1, c2, accuracy) => {
  if (Array.isArray(c1)) c1 = positionArrayToObject(c1)
  if (Array.isArray(c2)) c2 = positionArrayToObject(c2)

  const degreesToRadians = (degrees) => degrees * Math.PI / 180
  const earthRadiusMiles = 3959
  const diffLat = degreesToRadians(c2.latitude - c1.latitude)
  const diffLong = degreesToRadians(c2.longitude - c1.longitude)
  const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
    Math.sin(diffLong / 2) * Math.sin(diffLong / 2) * Math.cos(c1.latitude) * Math.cos(c2.latitude)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = earthRadiusMiles * c
  if (accuracy) {
    return distance.toFixed(accuracy)
  }
  return distance
}

export const positionArrayToObject = (position) =>
  ({
    longitude: position[0],
    latitude: position[1]
  })

export const postionObjectToArray = (position) =>
  ([position.longitude, position.latitude])

/**
 * Position object or array to CSV
 * `({ latitude: 123, longitude: 321 }) => '123,321' `
 * `([321, 123]) => '123,312`
 *  * `({ latitude: 789, longitude: 456 }, 'longitude') => '456,789' `
 * `([456, 789]) => '456,789`
 * @param {Object|Array} position
 * @param {String} first - determines which value is first in the CSV
 */

export const positionToCSV = (position, first = 'latitude') => {
  switch (first) {
    case 'latitude':
      if (Array.isArray(position)) {
        return `${position[1]},${position[0]}`
      }
      return `${position.latitude},${position.longitude}`
    case 'longitude':
      if (Array.isArray(position)) {
        return `${position[0]},${position[1]}`
      }
      return `${position.longitude},${position.latitude}`
  }
}

const isValidLatLong = (num, range) => typeof num === 'number' && num <= range && num >= -1 * range

const isValidCoordinates = coords =>
  isValidLatLong(coords.latitude, 90) && isValidLatLong(coords.longitude, 180)

const getParameterString = (params = []) => {
  return params
    .map(({ key, value }) => {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(value)

      return `${encodedKey}=${encodedValue}`
    })
    .join('&')
}

/**
 *
 * const data = {
      map: 'Google',
      source: {
        latitude: -33.8356372,
        longitude: 18.6947617
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459
      },
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    }
 */

export const openMapsDirections = ({ map = 'Google', destination, source, params = [] } = {}) => {
  if (destination && isValidCoordinates(destination)) {
    params.push({
      key: 'daddr',
      value: `${destination.latitude},${destination.longitude}`
    })
  }
  if (source && isValidCoordinates(source)) {
    params.push({
      key: 'saddr',
      value: `${source.latitude},${source.longitude}`
    })
  }
  const url = (map === 'Apple') ? `https://maps.apple.com/?${getParameterString(params)}`
                                : `https://maps.google.com/maps?${getParameterString(params)}`
  return Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      return Promise.reject(new Error(`Could not open the url: ${url}`))
    } else {
      return Linking.openURL(url)
    }
  })
}
