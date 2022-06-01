const homeHandler = require('./handlers/homeHandler');
// eslint-disable-next-line import/extensions
const jsonHandler = require('./handlers/jsonHandler');
const publicHandler = require('./handlers/publicHandler');
const searchHandler = require('./handlers/searchHanlder');
const notFoundHandler = require('./handlers/notFoundHandler');
const submitHandler = require('./handlers/submitHandler');

const router = (request, response) => {
  const { url, method } = request;

  if (url === '/') {
    homeHandler(response);
  } else if (url === '/css/style.css') {
    publicHandler(response, url);
  } else if (url === '/js/script.js') {
    publicHandler(response, url);
  } else if (url === '/search' && method === 'POST') {
    searchHandler(request, response);
  } else if (url === '/countryInfo') {
    jsonHandler(response, 'countryInfo.json');
  } else if (url === '/countries') {
    jsonHandler(response, 'countries.json');
  } else if (url === '/send-data') {
    submitHandler(request, response);
  } else {
    notFoundHandler(response);
  }
};
module.exports = router;
