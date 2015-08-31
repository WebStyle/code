// requirements
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');
var Fleet = require('./app/models/fleet');
var Services = require('./app/models/services');
var Issues = require('./app/models/issues');
var Vendors = require('./app/models/vendors');
var Reminders = require('./app/models/reminders');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

mongoose.connect(config.database);
app.set('superSecret', config.secret);
app.use(morgan('dev'));

var cors = require('express-cors');

//adding static files from directory
app.use(express.static('public'));
// Views
app.set('view engine', 'jade');
app.set('views', './public');

app.use(cors({
    allowedOrigins: [
        'localhost:3000',
        '10.10.10.145:3000'
    ],
    headers: [
      'Authorization',
      'Content-Type'
    ]
}));

app.post('/setup', function(req, res) {

    // create a sample user and fleet
    var nick = new User(req.body);
    var newfleet = new Fleet({FleetName: req.body.FleetName});

    nick.save(function (err) {
        if (err) throw err;
        console.log('New user added');
    });

    newfleet.save(function (err) {
      if (err) throw err;
      console.log('New fleet added');
    });

    var token = jwt.sign('', app.get('superSecret'), {
        expiresInMinutes: 1440
    });
    res.json({ success: true, token: token });
});

app.post('/fleetDelete/', function (req, res) {
  Fleet.remove(function (err, product) {
    if (err) return handleError(err);
    Fleet.findById(req.body.id, function (err, product) {
      console.log(product) // null
    });
  });
});

app.post('/userDelete/', function (req, res) {
  User.remove( {"_id": req.body.id});
});

app.post('/upload', function(req, res) {
  res.json(req.body);
});

app.post('/fleetAdd', function(req, res) {

    // create a sample  fleet
    var newfleet = new Fleet(req.body);

    newfleet.save(function (err) {
      if (err) throw err;
      console.log('New fleet added');
    });

    var token = jwt.sign('', app.get('superSecret'), {
        expiresInMinutes: 1440
    });
    res.json({ success: true, token: token });

});

app.post('/servicesAdd', function(req, res) {
    // create a sample services
    var newServices = new Services(req.body);
    newServices.save(function (err) {
      if (err) throw err;
      console.log('New services added');
    });
    var token = jwt.sign('', app.get('superSecret'), {
        expiresInMinutes: 1440
    });
    res.json({ success: true, token: token });
});

app.post('/remindersAdd', function(req, res) {
    // create a sample services
    var newServices = new Services(req.body);
    newServices.save(function (err) {
      if (err) throw err;
      console.log('New reminders added');
    });
    var token = jwt.sign('', app.get('superSecret'), {
        expiresInMinutes: 1440
    });
    res.json({ success: true, token: token });
});

app.post('/issuesAdd', function(req, res) {
    // create a sample services
    var newIssues = new Issues(req.body);
    newIssues.save(function (err) {
      if (err) throw err;
      console.log('New issues added');
    });
    var token = jwt.sign('', app.get('superSecret'), {
        expiresInMinutes: 1440
    });
    res.json({ success: true, token: token });
});

app.post('/vendorsAdd', function(req, res) {
    // create a sample services
    var newVendors = new Vendors(req.body);
    newVendors.save(function (err) {
      if (err) throw err;
      console.log('New vendors added');
    });
    var token = jwt.sign('', app.get('superSecret'), {
        expiresInMinutes: 1440
    });
    res.json({ success: true, token: token });
});

app.get('/lang?')

// API routes
var apiRoutes = express.Router();

apiRoutes.post('/auth', function(req, res) {
  // find the user
  User.findOne({
    name: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
            expiresInMinutes: 60*5
        });

        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
      }
    }
  });
});
// apiRoutes.use(function (req, res, next) {
//
//     var token = req.body.token;
//
//     if(token) {
//         jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//             if (err) {
//                 return res.json({success: false, message: 'failed to auth token'})
//             } else {
//                req.decoded = decoded;
//             }
//         });
//     } else {
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided'
//         });
//     }
// });

apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the API'});
});

apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

apiRoutes.get('/fleet', function(req, res) {
    Fleet.find({}, function(err, fleets) {
        res.json(fleets);
    });
});

apiRoutes.get('/services', function(req, res) {
    Services.find({}, function(err, services) {
        res.json(services);
    });
});

apiRoutes.get('/issues', function(req, res) {
    Issues.find({}, function(err, issues) {
        res.json(issues);
    });
});

apiRoutes.get('/vendors', function(req, res) {
    Vendors.find({}, function(err, vendors) {
        res.json(vendors);
    });
});

apiRoutes.get('/fleet/edit/:fleetId', function(req, res, value) {
    Fleet.findOne({
        _id: value
    }, function(err, fleet) {
      var updateFleet = new Fleet(req.body);
      updateFleet.save(function (err) {
          if (err) throw err;
          console.log('Fleet updated');
      });
    });
});

app.use('/api', apiRoutes);


// vehicle
// app.route('/vehicle')
// 	.get(function (req, res) {
//       res.send(vehicle);
// 	})
// 	.post(function (req, res, next) {
//     var post = JSON.stringify(req.body);
//     console.log(req.body);
//     connection.query('INSERT INTO `contentVehicles` SET `content`="aaaaa"', function(error, results, fields) {
//         res.send(post);
//     });
//   });
// app.post('/p',
//   jwt({secret: 'ula'}),
//   function(req, res) {
//     if (!req.body.name) return res.send('error');
//     res.send("YES");
// });

// fuel
app.route('/fuel')
	 .get(function (req, res) {
      res.json(fuel);
	}).post(function (req, res) {
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
