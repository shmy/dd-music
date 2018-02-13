const request = require('request')
const { createWriteStream } = require('fs')
module.exports = (url, filename) => new Promise((resolve, reject) => {
  request(url)
    .once('end', function () {
      resolve(filename)
    })
    .once('error', function (error) {
      reject(error)
    })
    .pipe(createWriteStream(filename))
})
