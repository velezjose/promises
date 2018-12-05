/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  var fileReadStream = fs.createReadStream(filePath, 'utf8');
  var index;
  var accumulatedData = '';
  var position = 0;

  return new Promise((resolve, reject) => {
    fileReadStream
      .on('data', (chunk) => {
        accumulatedData += chunk;
        index = chunk.indexOf('\n');
  
        if (index !== -1) {
          resolve(accumulatedData.slice(0, position + index));
          fileReadStream.close();
        } else {
          position += chunk.length;
        }
      })
      .on('error', (err) => reject(err));
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.statusCode);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
