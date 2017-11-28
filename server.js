var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var cors = require('cors')
var app = express();

var MongoClient = mongo.MongoClient;

MongoClient.connect('mongodb://localhost:27017/toDo', function(err, db) {
  if (err) {
    console.log('failed to connect to mongo');
    console.log(err);
  }
  app.use(express.static('./public'));

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.get('/', function(req, res, next) {
    res.sendFile('/html/index.html', {
      root: './public'
    });
    //   next();
  });

  app.get('/getData', function(req, res, next) {
    var objectForDatabase = {}
    var dbContents = db.collection('list').find({}).toArray(
      function(err,docs){
      if (err) {
        console.log(err)
        res.send("You done messed up!")
      }
      else {
        res.send(docs)
      }
    }
    )
  })




  app.post('/submit', function(req, res) {
    db.collection('list').insert({text: req.body.text, complete: req.body.complete}, function(err) {
      if (err) {
        res.send('You done messed up!');
      } else {
        console.log(req.body);
        res.send('You did it');
      }
    });
    db.collection('list').update({ complete: "true" }, { $set: {complete: true} }, { multi: true })
    db.collection('list').update({ complete: "false" }, { $set: {complete: false} }, { multi: true })
  });

  app.post('/complete', function(req, res) {
    db.collection('list').update({
      text: req.body.text
    }, {
      text: req.body.text,
      complete: req.body.complete
    }, {
      upsert: true
    }, function(err) {
      if (err) {
        res.send('You done messed up: ' + err);
      } else {
        res.send('complete');
        console.log(req);
      }
    });
  });

  app.post('/delete', function(req, res) {
    db.collection('list').remove({text: {$eq: req.body.text}})
    console.log(req.body.text);
    res.send('delete')
  })

  app.listen(8080, function() {
    console.log('server listening on port 8080')
  });

});
