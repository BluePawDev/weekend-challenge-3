/*** REQUIRES ***/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

/*** GLOBALS ***/
var app = express();
var config = {
	database: 'dbtodo',
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

// START /tasks GET response
app.get('/tasks', function(req, res) {
	console.log('/tasks URL hit');
	// Start definition to connect to dbToDo
	pool.connect(function(err, connection, done) {
		// Start if error
		if (err) {
			console.log('error connecting to db', err);
			done();
			res.send(400);
		} // End if error
		else { // Start else for successful db connection
			console.log('Connected to dbToDo');
			var toDoArray = []; // Empty array for results
			// Start of SELECT query
			var resultSet = connection.query('SELECT * FROM tbltodo');
			resultSet.on('row', function(row) {
				// Loop through resultSet; push each row into toDoArray
				toDoArray.push(row);
			}); // End of SELECT query instructions
			// Start end connection definition
			resultSet.on('end', function() {
				// Close connection
				done();
				res.send(toDoArray);
			}); // End of end connection definition
		} // End of else for successful db connection
	}); // End definition to connect to dbToDo
}); // END /tasks GET response

// START /newTask to POST
app.post('/newTask', function(req, res) {
	var data = req.body;
	var task = data.task;
	var due = data.due;
	pool.connect(function(err, connection, done) {
		if (err) {
			console.log('error connecting to db');
			done();
			res.send(400);
		} else {
			var updateTasks = connection.query('INSERT INTO tbltodo(txttask, dtmdue) VALUES ($1, $2)', [task, due]);
			done();
			res.sendStatus(200);
		}
	})
});

// START /updateTask to POST
app.post('/updateTask', function(req, res) {
	var data = req.body;
	var taskFinished = data.task;
	var dateDone = data.done;
	pool.connect(function(err, connection, done) {
		if (err) {
			console.log('error connecting to db');
			done();
			res.send(400);
		} else {
			var updateTask = connection.query("UPDATE tbltodo SET dtmcomplete = '" + dateDone + "' WHERE txttask = '" + req.body.taskFinished + "';");
			done();
			res.sendStatus(200);
		}
	})
});

// START /taskDelete
app.post('/taskDelete', function(req, res) {

});
