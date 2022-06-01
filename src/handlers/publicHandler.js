const path = require('path');
const fs = require('fs');

const type = {
  css: 'text',
  js: 'text/javascript',
};
const publicHandler = (response, url) => {
  const extension = url.split('.')[1];

  const filePath = path.join(__dirname, '..', '..', 'public', url);
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(500);
      response.end('server error');
    } else {
      response.writeHead(200, { 'Content-type': `${type[extension]}/${extension}` });
      response.end(data);
    }
  });
};

module.exports = publicHandler;
