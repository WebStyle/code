// requirements
var express = require('express');
var app = express();

//adding static files from directory
app.use(express.static('public'));
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123',
  database : 'robotjon'
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


// get vehicle
connection.query('SELECT * FROM `vehicle`', function (error, results, fields) {
  	vehicle = results;
});

// get fuel
connection.query('SELECT * FROM `fuel`', function (error, results, fields) {
  	fuel = results;
});

// get services
connection.query('SELECT * FROM `services`', function (error, results, fields) {
  	services = results;
});

// get issues
connection.query('SELECT * FROM `issues`', function (error, results, fields) {
  	issues = results;
});

// get vendors
connection.query('SELECT * FROM `vendors`', function (error, results, fields) {
  	vendors = results;
});

// get vendors
connection.query('SELECT * FROM `users`', function (error, results, fields) {
  	users = results;
});

// vehicle
app.route('/vehicle')
	.get(function (req, res) {
		res.send(vehicle);
	})
	.post(function (req, res) {
		res.send("Post Request");
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
var server = app.listen(3000, function () {
  	var host = server.address().address;
  	var port = server.address().port;
  	console.log('Server ishga tushdi');
});

connection.end();