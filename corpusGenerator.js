const fs = require('fs')

const corpus = []
for (let j = 0; j < 26; j += 1) {
  for (let i = 0; i < 1000; i += 1) {
    let num = `${i}`
    if (i < 10) {
      num = '00' + i
    } else if (i < 100) {
      num = '0' + i
    }
    corpus.push(`${String.fromCharCode(65 + j)}${num}`)
  }
}

const file = fs.createWriteStream('corpus.txt')

corpus.forEach((v) => file.write(v + '\n'))

file.end()
