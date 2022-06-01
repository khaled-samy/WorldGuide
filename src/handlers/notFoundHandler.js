const notFoundHandler = (response) => {
  response.writeHead(404);
  response.end('<h1 style="font-size: 100px; color: red;">NOT FOUND</h1>');
};

module.exports = notFoundHandler;
