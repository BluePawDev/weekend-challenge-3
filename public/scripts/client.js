console.log('JavaScript sourced');

$(document).ready(function() {
	console.log('jQuery sourced');
	$('#cmdDone').on('click', clickDone);
	$('#cmdAdd').on('click', clickAdd);
	$('tr:odd').css('background-color', '#FAFAFA');
});

var clickDone = function() {
	console.log('Done clicked');
};

var clickAdd = function() {
	console.log('Add clicked');
	$('#tblToDo').append('<tr><td id="cellTask"><input class="input txtTask" type="text" name="txtTask" value=""></td><td id="cellPriority"><input class="inputText inputCenter txtPriority" type="text" name="txtPriority" value=""></td><td id="cellDue"><input class="inputText inputCenter dtmDue" type="text" name="dtmDue" value=""></td><td id="cellComplete"><input class="inputText inputCenter dtmDue" type="text" name="dtmComplete" value disabled="disabled"></td><td id="cellDone"><button id="cmdDone" type="button" name="cmdDone">Done</button></td><td id="cellDone"><button id="cmdAdd" type="button" name="cmdNew">+</button></td></tr>')
};





function getTasks() {
	$.ajax({
		type: 'GET',
		url: '/tasks',
		success: function(response) {
			console.log(response);
			for (var i = 0; i < response.length; i++) {
				var x = response[i];
				var owner = x.firstname + ' ' + x.lastname;
				$('#ownerSelect').append('<option value="' + owner + '">' + owner + '</option>');
				if (x.petname === null) {
					alert(owner + ' pet registration needs to be finished');
				} else {
					$('#tblToDo').append('<tr class="new" id="' + i + '">' +
						'<td id="tdOwner"><input type="text" name="Owner" value="' + owner + '" value disabled="disabled"></td>' +
						'<td id="tdPet"><input type="text" name="Pet" value="' + x.petname + '"></td>' +
						'<td id="tdBreed"><input type="text" name="Breed" value="' + x.breed + '"></td>' +
						'<td id="tdColor"><input type="text" name="Color" value="' + x.color + '"></td>' +
						'<td id="tdUpdate"><button type="button" name="Update">GO</button></td>' +
						'<td id="tdDelete"><button type="button" name="Delete">GO</button></td>' +
						'<td id="tdCheck"><button id="in' + i + '" type="button" name="Check">IN</button>' +
						'<button id="out' + i + '" type="button" name="Check">OUT</button></td>' +
						'</tr>');
				}
			} //for loop end
			for (var k = 0; k < response.length; k++) {
				var y = response[k];
				if (y.checkin === null) {
					$('#in' + k).css('display', 'inline');
					$('#out' + k).css('display', 'none');
				} else if (y.checkout === null) {
					$('#in' + k).css('display', 'none');
					$('#out' + k).css('display', 'inline');
				}
			}
		}
	});
}
