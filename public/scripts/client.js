// START on Doc Ready
$(document).ready(function() {
	getTasks();
	$('#cmdAdd').on('click', clickAdd);
	$('#tblToDo').on('click', '#cmdDone', clickDone);
	$('#tblToDo').on('click', '#cmdRemove', clickRemove);
}); // END on Doc Ready

// START clickAdd
function clickAdd() {
	// Local variables
	var task = $('#txtNewTask').val();
	var due = $('#dtmNewDue').val();
	// If evaluating for empty fields
	if (task === '' || due === "") {
		alert('Supply a task and due date');
	} else { // Star of else
		// Start task obj to send definition
		var taskToPost = {
			task: task,
			due: due
		}; // End task obj to send definition
		// Start of Ajax newTask to POST
		$.ajax({
			type: 'POST',
			url: '/newTask',
			data: taskToPost,
			success: function(response) {}
		}); // End of Ajax newTask to POST
	} // End of else
} // END clickAdd

// START getTasks function
function getTasks() {
	// Start of Ajax GET call definition
	$.ajax({
		type: 'GET',
		url: '/tasks',
		// Start of success definition
		success: function(response) {
			// Start of for loop through response array
			for (var i = 0; i < response.length; i++) {
				// Start local variables
				var x = response[i];
				var task = x.txtTask;
				var priority = x.txtPriority;
				var due = x.dtmDue.split('-');
				var dueDTM = due[2].split('T');
				var dueD = dueDTM[0];
				var dueDate = due[1] + '/' + dueD + '/' + due[0];
				var complete = x.dtmComplete;
				// End local variables
				// Start append tasks from db to tblToDo
				$('#tblToDo').append('<tr id="' + i + '">' + '<td id="cellTask">' + '<input class="input txtTask" type="text" name="txtTask" value="' + task + '">' + '</td>' + '<td id="cellDue">' + '<input class="input inputCenter dtmDue" type="text" name="dtmDue" value="' + dueDate + '">' + '</td>' + '<td id="cellDone">' + '<button id="cmdDone" class="cmdBtn" type="button" name="cmdDone">' + 'Done' + '</button>' + '</td>' + '<td id="cellRemove">' + '<button id="cmdRemove" class="cmdBtn" type="button" name="cmdRemove">' + 'Remove' + '</button>' + '</td>' + '</tr>');
				// End append tasks from db to tblToDo
			} // End of for loop through response array
		} // End of success definition
	}); // End of Ajax GET call definition
} // END getTasks function

// START clickDone
function clickDone() {
	console.log('Done clicked');
} // END clickDone

// START clickRemove
function clickRemove() {
	console.log('Remove clicked');
} // END clickRemove
