import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const replaceSuffixPattern = /--(active|big|small|very-big)/g
const icons = {
  'ios-person': [30, '#bbb'],
  'ios-person--big': [50, '#bbb'],

  'ios-person--active': [30, '#fff'],
  'ios-person--active--big': [50, '#fff'],
  'ios-person--active--very-big': [100, '#fff'],

  'ios-people': [30, '#bbb'],
  'ios-people--active': [30, '#fff'],

  'ios-keypad': [30, '#bbb'],
  'ios-keypad--active': [30, '#fff'],

  'ios-chatbubbles': [30, '#bbb'],
  'ios-chatbubbles--active': [30, '#fff'],

  'facebook': [30, '#bbb', FontAwesome],
  'facebook--active': [30, '#fff', FontAwesome]
}

const defaultIconProvider = Ionicons

let iconsMap = {}
let iconsLoaded = new Promise((resolve, reject) => {
  Promise.all(
    Object.keys(icons).map(iconName => {
      const Provider = icons[iconName][2] || defaultIconProvider
      return Provider.getImageSource(
        iconName.replace(replaceSuffixPattern, ''),
        icons[iconName][0],
        icons[iconName][1]
      )
    })
  ).then(sources => {
    Object.keys(icons)
      .forEach((iconName, idx) => { iconsMap[iconName] = sources[idx] })
    resolve(true)
  })
})

export {
  iconsMap,
  iconsLoaded
}
