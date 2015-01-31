var bodyParser = require('body-parser'); 	
var Item       = require('../models/item');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {
	var apiRouter = express.Router();

	apiRouter.use(function (req, res, next) {
		console.log(req.method, req.url);
		next();
	});

	apiRouter.get('/', function (req, res) {
		res.json({msg: 'you hit the api home'});
	});

	apiRouter.route('/category/:name') 
	.get(function (req, res) {
		Item.find({categories: req.params.name}, function (err, items) {
			if (err) res.send(err);

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
			item.title = req.body.title;
			item.description = req.body.description;
			item.link = req.body.link;
			item.thumb = req.body.thumb;
			item.image = req.body.image;
			item.categories = req.body.categories;
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
				if (req.body.title) item.title = req.body.title;
				if (req.body.description) item.description = req.body.description;
				if (req.body.link) item.link = req.body.link;
				if (req.body.thumb) item.thumb = req.body.thumb;
				if (req.body.image) item.image = req.body.image;
				if (req.body.categories) item.categories = req.body.categories;
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

	return apiRouter;
};