/**
 * 文件到数据库
 */
var mongod = require('mongodb');
var fs = require("fs");
var dbname = "stars_dev";
var colname = "nodes";
var lines;
var members = [];

var db = new mongod.Db(
    dbname,
    new mongod.Server('127.0.0.1', 27017),
    {
        native_parser:false
    }
);

fs.readFile("./fulllist2.txt", function(err, data){
    if(err){
        throw err;
    }

    if(data){
        lines = data.toString("utf-8").split("\r\n")
        console.log(lines.length);

        lines.forEach(function(line){
            if(!line) return;

            var raw = line.split("\t");

            var data = {
                id : parseInt(raw[0], 10),
                truename : raw[1],
                nickname : raw[2] || raw[1], //如果没有花名
                boss : parseInt(raw[3]),
                position : {
                    "x" : Math.random(),
                    "y" : Math.random()
                },
                sex : raw[13]
            };

            console.log(raw[0], data.nickname);
            members.push(data);

        });

        db.open(function(err,db){
            db.collection(colname,function(err,collection){
                members.forEach(function(item){
                    collection.insert(item, function(err, doc){
                        console.log("insert",doc[0].id, doc[0]._id);
                    });
                });
            });
        });
    }
});


