/*** REQUIRES ***/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

/*** GLOBALS ***/
var app = express();
var urlencodedParser = bodyParser.urlencoded({
	extended: true
});
var config = {
	database: 'dbToDo',
	host: 'localhost',
	port: 5432,
	max: 12
};
var pool = new pg.Pool(config);
var toDoArray = [];

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

app.get('/tasks', function(req, res) {
	console.log('/tasks URL hit');
	pool.connect(function(err, connection, done) {
		if (err) {
			console.log('error in connection', err);
			done();
			res.send(400);
		} else {
			var toDoData = connection.query('SELECT * FROM tblToDo');

			toDoData.on('row', function(row) {
				toDoArray.push(row);
			});
			toDoArray.on('end', function() {
				done();
				res.send(toDoData);
			});
		}
	});
});
