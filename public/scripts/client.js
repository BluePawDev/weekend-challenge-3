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
			console.log(response);
		}
	});
} // END tasks GET request
