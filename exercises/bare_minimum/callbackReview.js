/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  var fileReadStream = fs.createReadStream(filePath, 'utf8');
  var index;
  var accumulatedData = '';
  var position = 0;

  fileReadStream
    .on('data', (chunk) => {
      accumulatedData += chunk;
      index = chunk.indexOf('\n');

      if (index !== -1) {
        fileReadStream.close();
      } else {
        position += chunk.length;
      }
    })
    .on('close', () => callback(null, accumulatedData.slice(0, position + index)))
    .on('error', (err) => callback(err));
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, (err, response, body) => {
    if (err) {
      callback(err);
    } else {
      callback(null, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
