// requirements
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
var cors = require('express-cors');

//adding static files from directory
app.use(express.static('public'));
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123',
  database : 'test'
});

connection.connect();

// Views
app.set('view engine', 'jade');
app.set('views', './public');

// module variables
var vehicle;
var fuel;
var services;
var issues;
var vendors;
var users;

connection.query('SELECT * FROM `vehicles`', function (error, results, fields) {
    vehicle = results;
});

app.use(cors({
    allowedOrigins: [
        'localhost:3000'
    ]
}));

// vehicle
app.route('/vehicle')
	.get(function (req, res) {
      res.send(vehicle);
	})
	.post(function (req, res, next) {
    var post  = req.body;
    var query = connection.query('INSERT INTO vehicles SET ?', post, function(err, result) {
        res.send(req.body);
    });
    console.log(query.sql);
  });

// fuel
app.route('/fuel')
	.get(function (req, res) {
      res.send(fuel);
	})
	.post(function (req, res) {
		  res.send("Post Request");
	});

// services
app.route('/services')
	.get(function (req, res) {
		  res.send(services);
	})
	.post(function (req, res) {
		res.send("Post Request");
	});

// vendors
app.route('/vendors')
	.get(function (req, res) {
		res.send(vendors);
	})
	.post(function (req, res) {
		res.send("Post Request");
	});

// users
app.route('/users')
	.get(function (req, res) {
		res.send(users);
	})
	.post(function (req, res) {
		res.send("Post Request");
	});

// User
app.get('/', function (req, res) {
	res.render("index");
});

// Server settings
var server = app.listen(1337, function () {
  	var host = server.address().address;
  	var port = server.address().port;
  	console.log('Server ishga tushdi');
});

connection.end();
