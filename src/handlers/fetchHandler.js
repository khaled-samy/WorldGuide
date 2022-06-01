const https = require('https');

const fetchHandler = (link, response) => {
  https
    .get(link, (resp) => {
      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log('api', data);
        response.end(data);
      });
    })
    .on('error', (err) => {
      console.log('Error:', err.message);
    });
};

module.exports = fetchHandler;
