
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();
var dbname = "stars";
var mongod = require('mongodb');
var _ = require("underscore");
var BSON = mongod.BSONPure;

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    dbname = "dtars-dev";
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
    res.render('index', {
        title: 'Express'
    });
});

app.get('/api/:method', function(req, res){
    var method = req.params.method;
});

app.listen(3001);
console.log("Express server listening on port %d", app.address().port);
