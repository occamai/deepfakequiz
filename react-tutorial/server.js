"use strict";

const config = require("./config/config");
const NodeService = require("./config/node-service");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var multer = require("multer");
var upload = multer();
var favicon = require("serve-favicon");
var https = require('https');
var fs = require('fs');
// var cookieSession = require('cookie-session')

var api = require("./api");
var passport = require("passport");

const { deepfakequiz } = config;
if (!deepfakequiz) throw new Error("configuration cannot be null/undefined");

const PORT = 443; //deepfakequiz.port;

if (NodeService.isProduction()) {
  const express = require("express");
  const path = require("path");

  const app = express();

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, OPTIONS, PUT, DELETE"
    );
    next();
  });

  app.use(favicon(__dirname + "/public/favicon.ico"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(upload.array());

  // Configure static resources
  app.use(express.static(path.join(__dirname, "/dicts")));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/api", api);

  // Configure server-side routing
  app.get("/", (req, res) => {
    const dist = path.join(__dirname, "/dicts/index.html");
    res.sendFile(dist);
  });

  app.get("/start", (req, res) => {
    const dist = path.join(__dirname, "/dicts/index.html");
    res.sendFile(dist);
  });
  
  app.get("/wavenet", (req, res) => {
    const dist = path.join(__dirname, "/dicts/index.html");
    res.sendFile(dist);
  });
  
  app.get("/wavenetstart", (req, res) => {
    const dist = path.join(__dirname, "/dicts/index.html");
    res.sendFile(dist);
  });
  
  app.get("/wavenet2", (req, res) => {
    const dist = path.join(__dirname, "/dicts/index.html");
    res.sendFile(dist);
  });
  
  app.get("/wavenet2start", (req, res) => {
    const dist = path.join(__dirname, "/dicts/index.html");
    res.sendFile(dist);
  });

  //for server
  https.createServer({
	   key: fs.readFileSync('/home/ubuntu/ssl/private-key.pem'),
	   cert: fs.readFileSync('/home/ubuntu/ssl/252239439.crt'),
	   ca: fs.readFileSync('/home/ubuntu//ssl/252239439.ca-bundle')
	 }, app).listen(PORT, function() {
     console.log(`Started Express server on port ${PORT}`);
   });

  // for localhost 
  //app.listen(PORT, () => {
  //  console.log(`Started Express server on port ${PORT}`);
  // });
} else {
  const webpack = require("webpack");
  const WebpackDevServer = require("webpack-dev-server");
  const config = require("./webpack.config.js");

  new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true
  }).listen(PORT, "localhost", error => {
    console.log(error || `Started WebpackDevServer on port ${PORT}`);
  });
}
