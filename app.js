
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();
var dbname = "stars";
var colname = "nodes";
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
    dbname = "stars_dev";
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
    db = new mongod.Db(
        dbname,
        new mongod.Server('127.0.0.1', 27017),
        {
            native_parser:false
        }
    );
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
    db = new mongod.Db(
        dbname,
        new mongod.Server('127.0.0.1', 27017),
        {
            native_parser:false
        }
    );
});

// Routes

app.get('/', function(req, res){
    res.render('index', {
        title: 'Express'
    });
});

app.get('/api/:method', function(req, res){
    var method = req.params.method;
    db.open(function(err, db){
        if(err) throw err;
        db.collection(colname ,function(err, collection){
            if(err) throw err;
            switch(method){
                case  "getAllNodes":
                    collection.find({}, function(err, cursor){
                        var docs = [];
                        cursor.each(function(err,doc){
                            if(err) throw err;
                            if(doc){
                                docs.push(doc);
                            }else{
                                db.close();
                                res.send(JSON.stringify(docs))
                            }
                        });
                    });
                    break;
            }
        });
    })
});

app.listen(3001);
console.log("Express server listening on port %d", app.address().port);
