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
        db.collection('list').insert(req.body, function(err){
            if (err){
                res.send('You done messed up!');
            }
            else {
                console.log(req.body);
                res.send('You did it');
            }
        });
    });

    app.post('/complete', function(req,res){
        db.collection('list').update({text: req.body.text}, {complete: req.body.complete}, function(err) {
            if (err) {
                res.send('You done messed up!');
            }
            else {
                res.send('complete');
                console.log(req);
            }
        });
    });

    app.post('/delete', function(req,res){
        console.log(req);
        res.send('delete')
    })

    app.listen(8080, function(){
      console.log('server listening on port 8080')
    });

});
