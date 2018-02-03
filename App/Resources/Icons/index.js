import Ionicons from 'react-native-vector-icons/Ionicons'
import reference from './reference'
const replaceSuffixPattern = /--(active|big|small|very-big)/g
const icons = {
  'ios-person': [30, '#bbb'],
  'md-person': [30, '#bbb']
}

const defaultIconProvider = Ionicons

let iconsMap = {}
let iconsLoaded = new Promise((resolve, reject) => {
  new Promise.all(
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
  reference,
  iconsMap,
  iconsLoaded
}
