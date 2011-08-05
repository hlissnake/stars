/**
 * 读取数据库
 */
var mongod = require('mongodb');
var dbname = "stars_dev";
var colname = "nodes";
var db = new mongod.Db(
    dbname,
    new mongod.Server('127.0.0.1', 27017),
    {
        native_parser:false
    }
);

db.open(function(err,db){
    db.collection(colname,function(err,collection){
        collection.find({}, function(err, d){
            if(err)
                throw err;
            d.each(function(err,doc){
                console.log(doc);
            });
        })
    });
});
