/*** REQUIRES ***/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

// Globals
var app = express();
var urlencodedParser = bodyParser.urlencoded({
	extended: true
});

// Listen
app.listen(7500, function() {
	console.log('server listening on :7500');
});

/*** USES ***/
app.use(express.static('public'));


/*** ROUTES ***/
// Base URL
app.get('/', function(req, res) {
	console.log('Base URL hit');
	res.sendFile(path.resolve('views/index.html'));
});
