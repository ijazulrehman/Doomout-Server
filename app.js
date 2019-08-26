var express = require('express');
var cors = require('cors');
var path = require("path");
var bodyParser = require("body-parser");
var index = require('./routes/index');
var wishlist = require('./routes/wishlist');
//Init App and Socket
var app = express()
  , server = require('http').createServer(app);

var mongo = require('mongodb');
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

//mlab mongo db coonnection
var mongodbUri ='mongodb://@ds125502.mlab.com:25502/validations';
const mongooseOptions = {
  auth: {
    user: 'validator',
    password: 'rotadilav1'
  },
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  keepAlive: 300000,
  connectTimeoutMS: 300000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(mongodbUri, mongooseOptions);
// mongoose.connect("mongodb://localhost/validations");

var db = mongoose.connection;

//Body-parser and Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

//Set static Folder
app.use('/public',express.static(path.join(__dirname, 'public')));




// super routers
app.use('/', index);
app.use('/wishlist', wishlist);


// Set Port
app.set('port', (process.env.PORT || 1122));


//listening the server at specific port
server.listen(app.get('port'), function(){
  console.log("Listening at port : "+ app.get('port'));
 });
