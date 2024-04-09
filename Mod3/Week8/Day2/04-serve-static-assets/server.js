const http = require("http");
const fs = require("fs");

const getContentType = (ext) => {
  // if (ext === "css") return "text/css";
  // if (ext === "jpg") return "image/jpeg";

  // return "text/plain";

  switch (ext) {
    case "css":
      return "text/css";
    case "jpg":
      return "image/jpeg";
    default:
      return "text/plain";
  }
};

const server = http.createServer((req, res) => {
  // Your code here

  // static assets --------------------------- HTML? CSS? IMAGES?
  if (req.method === "GET" && req.url === "/") {
    const responseBody = fs.readFileSync("./index.html", "utf-8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.end(responseBody);
  }

  // if (req.method === "GET" && req.url === "/static/css/application.css") {
  //   const responseBody = fs.readFileSync(
  //     "./assets/css/application.css",
  //     "utf-8"
  //   );
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/css");
  //   return res.end(responseBody);
  // }

  // if (req.method === "GET" && req.url === "/static/images/dog.jpg") {
  //   const responseBody = fs.readFileSync(
  //     "./assets/images/dog.jpg"
  //   );
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "image/jpeg");
  //   return res.end(responseBody);
  // }

  if (req.method === "GET" && req.url.startsWith("/static")) {
    const reqUrl = req.url;
    console.log("req url ", reqUrl);
    const urlParts = reqUrl.split("/static");
    console.log("url parts ", urlParts);

    const urlPath = urlParts[1];
    console.log("url path ", urlPath);

    const ext = urlPath.split(".")[1];

    const responseBody = fs.readFileSync(`./assets/${urlPath}`);

    const contentType = getContentType(ext);
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    return res.end(responseBody);
  }
  // ---------------------------------------

  // POST ROUTES ==== require parsing logic ---------- SEND DATA

  // GET REQUEST === anything thats viewable to the user
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
