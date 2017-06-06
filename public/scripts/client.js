// START on Doc Ready
$(onReady);

// Start of onReady
function onReady() {
	getTasks();
	$('#cmdAdd').on('click', clickAdd);
	$('#tblToDo').on('click', '#cmdDone', clickDone);
	$('#tblToDo').on('click', '#cmdRemove', clickRemove);
} // End of onReady


// START clickAdd
function clickAdd() {
	// Local variables
	var task = $('#txtNewTask').val();
	var due = $('#dtmNewDue').val();
	// If evaluating for empty fields
	if (task === '' || due === "") {
		alert('Supply a task and due date');
	} else { // Start of else
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
				var task = x.txttask;
				var due = x.dtmdue.split('-');
				var dueDTM = due[2].split('T');
				var dueD = dueDTM[0];
				var dueDate = due[1] + '/' + dueD + '/' + due[0];
				var complete = x.dtmcomplete;
				// End local variables
				// Start append tasks from db to tblToDo
				$('#tblToDo').append('<tr id="' + i + '">' + '<td id="cellTask">' + '<input class="input txtTask" type="text" name="txtTask" value="' + task + '">' + '</td>' + '<td id="cellDue">' + '<input id="dtmDue" class="input inputCenter dtmDue" type="text" name="dtmDue" value="' + dueDate + '">' + '</td>' + '<td id="cellDone">' + '<button id="cmdDone" class="cmdBtn" type="button" name="cmdDone">' + 'Done' + '</button>' + '</td>' + '<td id="cellRemove">' + '<button id="cmdRemove" class="cmdBtn" type="button" name="cmdRemove">' + 'Remove' + '</button>' + '</td>' + '</tr>');
				console.log(x.complete);
				if (x.dtmcomplete !== null) {
					$(task).css('text-decoration', 'line-through', 'color', '#D8D8D8');
					// $(dueDate).css('text-decoration', 'line-through', 'color', '#D8D8D8');
					$(this).attr('disabled', 'disabled');
				}
				// End append tasks from db to tblToDo
			} // End of for loop through response array
		} // End of success definition
	}); // End of Ajax GET call definition
} // END getTasks function

// START clickDone
function clickDone() {
	// Local variables
	var $row = $(this).parent().parent();
	var $task = $(this).closest("tr").find("input.txtTask").val();
	var $taskTxt = $(this).closest("tr").find("input.txtTask");
	var $due = $(this).closest("tr").find("input.dtmDue").val();
	var $dueTxt = $(this).closest("tr").find("input.dtmDue");
	var dtmToday = new Date();
	var today = dtmToday.getMonth() + 1 + '/' + dtmToday.getDate() + '/' + dtmToday.getFullYear();
	$($taskTxt).css('text-decoration', 'line-through');
	$($taskTxt).css('color', '#D8D8D8');
	$($dueTxt).css('text-decoration', 'line-through', 'color', '#D8D8D8');
	$($dueTxt).css('color', '#D8D8D8');
	$(this).attr('disabled', 'disabled');
	// Start taskDone obj to POST
	var taskDone = {
		taskFinished: $task,
		done: today
	}; // End taskDone obj to POST
	console.log(taskDone);
	// Start of Ajax taskDone to POST
	$.ajax({
		type: 'POST',
		url: '/updateTask',
		data: taskDone,
		success: function(response) {
			console.log(response);
		} // End of success
	}); // End of Ajax taskDone to post
} // END clickDone

// START clickRemove
function clickRemove() {
	console.log('Remove clicked');
} // END clickRemove
