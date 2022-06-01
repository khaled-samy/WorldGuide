/* eslint-disable no-unused-vars */
const querystring = require('querystring');

const fetchHandler = require('./fetchHandler');

const url = 'https://restcountries.com/v3.1/name/';

const searchHandler = (request, response) => {
  let AllData = '';
  request.on('data', (chunkdata) => {
    AllData += chunkdata;
  });
  request.on('end', () => {
    const convertedData = querystring.parse(AllData);

    // eslint-disable-next-line space-infix-ops
    // fetchHandler(url + countries);

    response.writeHead(303, { Location: '/' });
    response.end();
  });
};

module.exports = searchHandler;
