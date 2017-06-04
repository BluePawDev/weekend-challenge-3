// START on Doc Ready
$(document).ready(function() {
	getTasks();
	// $('#cmdNew').on('click', clickNew);
	$('#cmdAdd').on('click', clickAdd);
	$('#tblToDo').on('click', '#cmdDone', clickDone);
	$('#tblToDo').on('click', '#cmdRemove', clickRemove);
}); // END on Doc Ready

// START clickNew
var clickNew = function() {
	console.log('New clicked');
	$('#tblToDo').append('<tr id="N">' + '<td id="cellTask">' + '<input class="input txtTask" type="text" name="txtTask" value="">' + '</td>' + '<td id = "cellPriority">' + '<input class="input inputCenter txtPriority" type="text" name="txtPriority" value="">' + '</td>' + '<td id="cellDue">' + '<input class="input inputCenter dtmDue" type="text" name="dtmDue" value="">' + '</td>' + '<td id="cellComplete">' + '<input class="input inputCenter dtmDue" value disabled="disabled" type="text" name="dtmComplete" value="">' + '</td>' + '<td id="cellAdd">' + '<button id="cmdAdd" class="cmdBtn" type="button" name="cmdAdd">' + 'Add' + '</button>' + '</td>' + '<td id="cellDone">' + '<button id="cmdDone" class="cmdBtn" type="button" name="cmdDone">' + 'Done' + '</button>' + '</td>' + '<td id="cellRemove">' + '<button id="cmdRemove" class="cmdBtn" type="button" name="cmdRemove">' + 'Remove' + '</button>' + '</td>' + '</tr>');
}; // END clickNew



// START clickAdd
function clickAdd() {
	var task = $('#txtNewTask').val();
	var due = $('#dtmNewDue').val();
	// Start task obj to send definition
	var taskToPost = {
		task: task,
		due: due
	}; // End task obj to send definition
	console.log(taskToPost);
	$.ajax({
		type: 'POST',
		url: '/newTask',
		data: taskToPost,
		success: function(response) {}
	})

}

// function clickAdd() {
// Local variables
// var row = $('#N');
// var priority = $('#N > td > .txtPriority').val();
// var due = $('.dtmDue').val();

// console.log(priority);
// console.log(due);
// } // END clickAdd

// START clickDone
function clickDone() {
	console.log('Done clicked');
} // END clickDone

// START clickRemove
function clickRemove() {
	console.log('Remove clicked');
} // END clickRemove


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
