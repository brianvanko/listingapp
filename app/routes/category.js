var bodyParser = require('body-parser'); 	
var Item       = require('../models/item');
var config     = require('../../config');

module.exports = function(app, express) {
	var categoryRouter = express.Router();

	categoryRouter.route('/:category') 
	.get(function (req, res) {
		Item.find({categories: req.params.category}, function (err, items) {
			if (err) res.send(err);

		 	res.json(items);
		});
	});

	return categoryRouter;
};