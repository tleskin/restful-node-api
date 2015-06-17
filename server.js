// Base Setup
// connect to database (hosted on modulus.io)

// call the packages
var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    mongoose    = require('mongoose'),
    port        = process.env.PORT || 8080;

var user = require('./app/models/user');
mongoose.connect('mongodb://localhost/myDatabase');

// user body parser to grab info from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configure app to handle CORS requests
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
  Authorization');
  next();
});

// log all requests to the console
app.use(morgan('dev'));

// ROUTES FOR API

// basic route for home page
app.get('/', function(req, res){
  res.send('Welcome to the home page!')
});

// get an instance of the express router
var apiRouter = express.Router();

//test route to make sure everything is working
// accessed at GET localhost:8080/api
apiRouter.get('/', function(req, res){
  res.json({ message: 'hooray! welcome to our api!'});
});

// more routes will happen here

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);

// start the server
app.listen(port);
console.log('Magic happens on port ' + port );
