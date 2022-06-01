const path = require('path');
const fs = require('fs');

const jsonHandler = (response, file) => {
  const filePath = path.join(__dirname, '..', '..', file);
  fs.readFile(filePath, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      response.writeHead(200, { 'Content-type': 'application/json' });
      console.log('data', data);
      response.end(data);
    }
  });
};
module.exports = jsonHandler;
