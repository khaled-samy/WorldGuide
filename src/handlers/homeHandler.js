const path = require('path');
const fs = require('fs');
const serverError = require('./searchHanlder');

const homeHandler = (response) => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'index.html');
  fs.readFile(filePath, (error, data) => {
    if (error) {
      // eslint-disable-next-line no-undef
      serverError(response);
      response.end();
    } else {
      response.writeHead(200, { 'Content-type': 'text/html' });
      response.end(data);
    }
  });
};
module.exports = homeHandler;
