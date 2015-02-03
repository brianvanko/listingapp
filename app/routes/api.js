var bodyParser = require('body-parser'); 	
var Item       = require('../models/item');
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {
	var apiRouter = express.Router();

	// apiRouter.use(function (req, res, next) {
	// 	console.log(req.method, req.url);
	// 	next();
	// });

	apiRouter.get('/', function (req, res) {
		res.json({msg: 'you hit the api home'});
	});

	apiRouter.route('/category/:name') 
	.get(function (req, res) {
		console.log('name', req.params.name)
		Item.find({categories: req.params.name}, function (err, items) {
			if (err) res.send(err);
			console.log('items', items)
		 	res.json(items);
		});
	});

	apiRouter.route('/items')
		.get(function (req, res) {
			Item.find(function (err, items) {
				if (err) res.send(err);

				res.json(items);
			});
		})
		.post(function (req, res) {
			var item = new Item();

			item.name = req.body.name;
			item.description = req.body.description;
			item.link = req.body.link;
			item.thumb = req.body.thumb;
			item.lg_img = req.body.lg_img;
			item.categories = req.body.categories;
			item.subcategory = req.body.subcategory;
			item.price = req.body.price;

			item.save(function (err) {
				if (err) res.send(err);

				res.json({msg: 'item created'});
			});
		});

	apiRouter.route('/items/:item_id')
		.get(function (req, res) {
			Item.findById(req.params.item_id, function (err, item) {
				if (err) res.send(err);

				res.json(item);
			});
		})
		.put(function (req, res) {
			Item.findById(req.params.item_id, function (err, item) {
				if (err) res.send(err);

				if (req.body.name) item.name = req.body.name;
				if (req.body.description) item.description = req.body.description;
				if (req.body.link) item.link = req.body.link;
				if (req.body.thumb) item.thumb = req.body.thumb;
				if (req.body.lg_img) item.lg_img = req.body.lg_img;
				if (req.body.categories) item.categories = req.body.categories;
				if (req.body.subcategory) item.subcategory = req.body.subcategory;
				if (req.body.price) item.price = req.body.price;

				item.save(function (err) {
					if (err) res.send(err);

					res.json({msg: 'Item updated'});
				});
			});
		})
		.delete(function(req, res) {
		    Item.remove({
		        _id: req.params.item_id
			}, function(err, item) {
				if (err) res.send(err);
		            res.json({ msg: 'Successfully deleted' });
				}); 
		});

	// USER API
	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res) {

	  // find the user
	  User.findOne({
	    username: req.body.username
	  }).select('name username password').exec(function(err, user) {

	    if (err) throw err;

	    // no user with that username was found
	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {

	      // check if password matches
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username
	        }, superSecret, {
	          expiresInMinutes: 1440 // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});

	// route middleware to verify a token
	apiRouter.use(function(req, res, next) {
		// do logging
		console.log('Somebody just came to our app!');

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {      

	      if (err) {
	        res.status(403).send({ success: false, message: 'Failed to authenticate token.' });  	   
	      } else { 
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	            
	        next(); // make sure we go to the next routes and don't stop here
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({ success: false, message: 'No token provided.' });
	    
	  }
	});

	// on routes that end in /users
	// ----------------------------------------------------
	apiRouter.route('/users')

		// create a user (accessed at POST http://localhost:3000/users)
		.post(function(req, res) {
			
			var user = new User();		// create a new instance of the User model
			user.name = req.body.name;  // set the users name (comes from the request)
			user.username = req.body.username;  // set the users username (comes from the request)
			user.password = req.body.password;  // set the users password (comes from the request)

			user.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'User created!' });
			});

		})

		// get all the users (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) {

			User.find({}, function(err, users) {
				if (err) res.send(err);

				// return the users
				res.json(users);
			});
		});

	// on routes that end in /users/:user_id
	// ----------------------------------------------------
	apiRouter.route('/users/:user_id')

		// get the user with that id
		.get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);

				// return that user
				res.json(user);
			});
		})

		// update the user with this id
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {

				if (err) res.send(err);

				// set the new user information if it exists in the request
				if (req.body.name) user.name = req.body.name;
				if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;

				// save the user
				user.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'User updated!' });
				});

			});
		})

		// delete the user with this id
		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

	// api endpoint to get user information
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	return apiRouter;
};