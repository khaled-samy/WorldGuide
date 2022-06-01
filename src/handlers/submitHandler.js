/* eslint-disable no-unused-vars */
const querystring = require('querystring');
const fetchHandler = require('./fetchHandler');

const url = 'https://restcountries.com/v3.1/name/';
const submitHandler = (request, response) => {
  let AllData = '';
  request.on('data', (chunkdata) => {
    AllData += chunkdata;
  });
  request.on('end', () => {
    fetchHandler(url + AllData, response);
  });
};

module.exports = submitHandler;
