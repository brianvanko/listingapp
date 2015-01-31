//IMPORT MODULES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var config = require('./config');

// GENERAL APP CONFIGURATION
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// CONFIGURE TO HANDLE CORS REQUESTS
 app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
 });

// CONNECT TO THE DATABASE
mongoose.connect(config.database);

// SET STATIC DIRECTORY
app.use(express.static(__dirname + '/public'));

// API ROUTES 
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// CATCH ALL AND DEFAULT INDEX
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER
app.listen(config.port, function(){
	console.log('listening on port ' + config.port);
});