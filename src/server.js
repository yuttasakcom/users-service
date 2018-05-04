const http = require("http");

const app = require("./app");

const server = http.createServer(app);

server.listen(app.get("port"), err => {
  if (err) {
    throw err;
    process.exit(1);
  }

  console.log(`Server running on port:${app.get("port")}`);
});
