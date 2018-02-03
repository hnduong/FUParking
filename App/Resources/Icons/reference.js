import EntypoGlyphs from 'react-native-vector-icons/glyphmaps/Entypo'
import EvilIconsGlyphs from 'react-native-vector-icons/glyphmaps/EvilIcons'
import FeatherGlyphs from 'react-native-vector-icons/glyphmaps/Feather'
import FontAwesomeGlyphs from 'react-native-vector-icons/glyphmaps/FontAwesome'
import FoundationGlyphs from 'react-native-vector-icons/glyphmaps/Foundation'
import IoniconsGlyphs from 'react-native-vector-icons/glyphmaps/Ionicons'
import MaterialIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialIcons'
import MaterialCommunityIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons'
import OcticonsGlyphs from 'react-native-vector-icons/glyphmaps/Octicons'
import ZocialGlyphs from 'react-native-vector-icons/glyphmaps/Zocial'

const GlyphMap = {
  Entypo: EntypoGlyphs,
  EvilIcons: EvilIconsGlyphs,
  Feather: FeatherGlyphs,
  FontAwesome: FontAwesomeGlyphs,
  Foundation: FoundationGlyphs,
  Ionicons: IoniconsGlyphs,
  MaterialIcons: MaterialIconsGlyphs,
  MaterialCommunityIcons: MaterialCommunityIconsGlyphs,
  Octicons: OcticonsGlyphs,
  Zocial: ZocialGlyphs
}
// creates the reference.json
const icons = Object.entries(GlyphMap)
              .map((entry) => ({ [entry[0]]: Object.keys(entry[1]) }))

// console.log(JSON.stringify(icons))

export default icons
