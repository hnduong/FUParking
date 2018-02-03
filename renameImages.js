const fs = require('fs')

const path = '/Users/hnduong/desktop/images'
const movePath = '/Users/hnduong/desktop/renamed'

const setMap = {
  Entypo: 'Entypo',
  EvilIcons: 'EvilIcons',
  Feather: 'Feather',
  FontAwesome: 'FontAwesome',
  Foundation: 'Foundation',
  Ionicons: 'Ionicons',
  MaterialIcons: 'MaterialIcons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Octicons: 'Octicons',
  Zocial: 'Zocial'
}

const files = fs.readdirSync(path)

files.forEach((file) => {

})

