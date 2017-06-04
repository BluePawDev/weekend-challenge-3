/*** REQUIRES ***/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

/*** GLOBALS ***/
var app = express();
var config = {
	database: 'dbToDo',
	host: 'localhost',
	port: 5432,
	max: 12
};
var pool = new pg.Pool(config);


// Listen
app.listen(7500, function() {
	console.log('server listening on :7500');
});


/*** USES ***/
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));


/*** ROUTES ***/
// START base URL
app.get('/', function(req, res) {
	console.log('Base URL hit');
	res.sendFile(path.resolve('views/index.html'));
}); // END base URL


// START tasks GET response
app.get('/tasks', function(req, res) {
	console.log('/tasks URL hit');
	// Connect to dbToDo
	pool.connect(function(err, connection, done) {
		// Start if error
		if (err) {
			console.log('error connecting to db', err);
			done();
			res.send(400);
		} // End if error
		else { // Start else
			console.log('Connected to dbToDo');
			var toDoArray = []; // Empty array for results
			var resultSet = connection.query('SELECT * FROM "tblToDo"');
			resultSet.on('row', function(row) {
				// Loop through resultSet; push each row into toDoArray
				toDoArray.push(row);
			}); // End else
			resultSet.on('end', function() {
				// Close connection
				done();
				res.send(toDoArray);
			});
		}
	});
}); // END tasks GET response
