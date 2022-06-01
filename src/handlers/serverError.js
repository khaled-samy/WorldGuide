const serverError = (response) => {
  response.writeHead(500);
  response.end('<h1 style="font-size: 100px; color: red;">SERVER ERROR</h1>');
};

module.exports = serverError;
