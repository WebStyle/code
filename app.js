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
        '10.10.10.107:3000'
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

// API routes
var apiRoutes = express.Router();

apiRoutes.post('/auth', function(req, res) {
  // find the user
  User.findOne({
    name: req.body.name
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
            expiresInMinutes: 1440
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
