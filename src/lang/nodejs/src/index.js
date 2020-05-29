const http = require("http");
const open = require("open");
const fs = require("fs");
const WebSocketServer = require("websocket").server;

/* CONSTANTS */

// Frontend file paths
const HTML_FILE_PATH = "../frontend.html";
const JS_FILE_PATH = "frontend.js";

const DEFAULT_PORT = 9101;
const HOST = "http://127.0.0.1";

/* NETWORKING VARIABLES */

let webSocket = null;
let connection = null; // refers to the web socket connection to the client once connection is established
let isRunning = false; // track if a browser window is already open

/**
 * Displays json data in a browser
 * @param {String} jsonStr Stringified JSON data to be viewed
 * @param {Number} port Port which the user wants to use for the network connection between browser and server. Default port of 9101 will be used if not provided by user
 */
exports.visualise = function visualise(jsonStr, port = DEFAULT_PORT) {
  // overhead of server creation only done on first call
  if (!isRunning) {
    isRunning = true;

    const httpServer = http.createServer((req, res) => {
      switch (req.url) {
        case '/':
          renderFile(res, HTML_FILE_PATH, 'text/html');
          break;
        case JS_FILE_PATH:
          renderFile(res, JS_FILE_PATH, 'text/javascript');
          break;
        default:
          res.writeHead(404, {
            'Content-Type': 'text/plain'
          });
          res.end('404 - Page not Found');
          break;
      }
    });

    httpServer.listen(port, (req, res) => {
      console.log("Server listening on port " + port);
    });

    webSocket = new WebSocketServer({
      "httpServer": httpServer
    });

    webSocket.on("request", request => {
      connection = request.accept(null, request.origin);

      connection.on("close", () => console.log("Connection closed"));
      connection.on("message", message => console.log(message));

      connection.send(jsonStr);
    });

    // show index.html in the browser
    open("http://127.0.0.1:" + port);

  } else if (connection == null) {
    setTimeout(() => visualise(jsonStr, port), 500);
  } else {
    connection.send(jsonStr);
  }
}

/**
 * Renders a file as a response to a request
 * @param {*} response Object representing the response
 * @param {String} filepath Path to the file to be rendered
 * @param {String} contentType The media type of the file
 */
function renderFile(response, filepath, contentType) {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      response.end('500 - Internal Server Error');
    } else {
      response.writeHead(200, {
        'Content-Type': contentType
      });
      response.end(data, 'utf-8');
    }
  });
}
