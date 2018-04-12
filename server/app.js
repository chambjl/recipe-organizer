var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var config = require('./config/config.json');
var _ = require('lodash');
var app = express();
var reload = require('reload');
var path = require("path");

app.set('port', process.env.PORT || config.port || 3000);
app.set('mongodb.port', process.env.MONGODB_PORT ||
        (config.mongodb ? config.mongodb.port : undefined) || 27017);
app.set('mongodb.ip', process.env.MONGODB_IP ||
        (config.mongodb ? config.mongodb.ip : undefined) || 'localhost');

var database;
MongoClient.connect('mongodb://' + app.get('mongodb.ip') + ':'
    + app.get('mongodb.port') + '/recipes',function(err,db){
  if(err) throw err;
  database = db
  console.log('connected to mongoDB on port ' + app.get('mongodb.port'));
});
app.use(function(req,res,next){
  req.db = database;
  next();
});

app.use(require('./routes/recipes'));
app.use(express.static(path.join(__dirname+'/static')));
app.get('/**', function(request, response){
  response.sendFile(path.join(__dirname+'/static/index.html'));
});

var server = app.listen(app.get('port'), function(){
  console.log('Listening on port ' + app.get('port'));
});



reload(server, app);
