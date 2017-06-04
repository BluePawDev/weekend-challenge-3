console.log('JavaScript sourced');

$(document).ready(function() {
	console.log('jQuery sourced');
	getTasks();
	$('#cmdNew').on('click', clickNew);
	$('#cmdDone').on('click', clickDone);
	$('#cmdRemove').on('click', clickRemove);
});

// START clickNew
var clickNew = function() {
	console.log('New clicked');
}; // END clickNew

// START clickDone
var clickDone = function() {
	console.log('Done clicked');
}; // END clickDone

// START clickRemove
var clickRemove = function() {
	console.log('Remove clicked');
}; // END clickRemove

// START tasks GET request
function getTasks() {
	$.ajax({
			type: 'GET',
			url: '/tasks',
			success: function(response) {
				for (var i = 0; i < response.length; i++) {
					var x = response[i];
					console.log(response[i]);
					var task = x.txtTask;
					console.log(task);
					var priority = x.txtPriority;
					console.log(priority);
					var due = x.dtmDue;
					console.log(due);
					var complete = x.dtmComplete;
					$('#tblToDo').append('<tr id="' + i + '">' + '<td id="cellTask">' + '<input class="input txtTask" type="text" name="txtTask" value="' + task + '">' + '</td>' + '<td id = "cellPriority">' + '<input class="input inputCenter txtPriority" type="text" name="txtPriority" value="' + priority + '">' + '</td>' + '<td id="cellDue">' + '<input class="input inputCenter dtmDue" type="text" name="dtmDue" value="' + due + '">' + '</td>' + '<td id="cellComplete">' + '<input class="input inputCenter dtmDue" value disabled="disabled" type="text" name="dtmComplete" value="' + complete + '">' + '</td>' + '<td id="cellDone">' + '<button id="cmdDone" class="cmdBtn" type="button" name="cmdDone">' + 'Done' + '</button>' + '</td>' + '<td id="cellDone">' + '<button id="cmdRemove" class="cmdBtn" type="button" name="cmdRemove">' + 'Remove' + '</button>' + '</td>' + '</tr>);
					}
				}
			});
	} // END tasks GET request
