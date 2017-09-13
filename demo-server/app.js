var express      = require('express');
var path         = require("path");
var app          = express();
var jsonServer   = require('json-server');
var server       = jsonServer.create(); // Returns an Express server
var router       = jsonServer.router('db.json'); // Returns an Express router

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/../app/index.html'));
});

server.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");res.setHeader("Access-Control-Expose-Headers","Access-Control-Allow-Origin");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,X-Prototype-Version,Content-Type,Cache-Control,Pragma,Origin");
    next();
});

server.use(jsonServer.defaults); // logger, static and cors middlewares
server.use(router); // Mount router on '/'
server.listen(5000);

app.use(express.static(path.join(__dirname, '../')));

var http = require('http').Server(app);

http.listen(8080);

