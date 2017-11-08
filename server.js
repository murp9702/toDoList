var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');

var app = express();

var MongoClient = mongo.MongoClient;

MongoClient.connect('mongodb://localhost:27017/toDo', function(err, db){
    if (err) {
        console.log('failed to connect to mongo');
        console.log(err);
    }
    app.use(express.static('./public'));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.get('/', function(req, res){
      res.sendFile('/html/index.html', {root: './public'});
    });

    app.post('/submit', function(req,res){
        console.log(req.body);
        res.send('good job');
    });

    app.post('/complete', function(req,res){
        console.log(req);
        res.send('good job');
    })

    app.listen(8080, function(){
      console.log('server listening on port 8080')
    });

});
