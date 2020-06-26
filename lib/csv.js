const { createReadStream } = require('fs')
const path = require('path')

function openFromCsvw (csvwPath) {
  const csvw = require(`../${csvwPath}`)

  return createReadStream(path.resolve(__dirname, csvw.url))
}

module.exports = {
  openFromCsvw
}
