import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';

import reference from './reference'

const setMap = {
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
  Zocial
}

let path = ''

// find . -name "*.png" -print0 | xargs -0 rm

const createImage = (size = 30, filter = []) => {
  Object.values(reference).map((entry) => {
    Object.entries(entry).map((entry) => {
      const set = entry[0]
      const icons = entry[1]
      icons.forEach(icon => {
        if (filter.indexOf(icon) > -1) {
          const Provider = setMap[set]
          Provider.getImageSource(
            icon,
            size,
            '#bbb'
          ).then((source) => {
            if (!path) {
              const uri = source.uri
              path = uri.split('/').slice(0, uri.split('/').length - 1).join('/')
              console.log(path)
            }
          })
        }
      })
    })
  })
}

export default createImage
