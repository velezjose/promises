/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promisification = require('./promisification');
var promiseConstructor = require('./promiseConstructor');

// promisification
// getGitHubProfileAsync: getGitHubProfileAsync(user),
// generateRandomTokenAsync: generateRandomTokenAsync(),
// readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync(filepath)

// promiseConstructor
// getStatusCodeAsync: getStatusCodeAsync(url),
// pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync(filepath)


var fetchProfileAndWriteToFile = (readFilePath, writeFilePath) => {
  return new Promise((resolve, reject) => {
    promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
      .then(firstLine => promisification.getGitHubProfileAsync(firstLine))
      .then(data =>  {
        let filedata = JSON.stringify(data);
        fs.writeFile(writeFilePath, filedata, (err) => {
          if (err) { 
            reject(err);
          } else {
            resolve(filedata);
          }
        });
      });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
