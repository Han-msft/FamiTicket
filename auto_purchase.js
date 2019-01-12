var autoPurchase = function(retry_interval, ticket_count) {
//page 1
var firstSubmit = submitData;
submitData(window.location.search.substr(6), '');

var page2_done = false;
$(document).ajaxComplete(function() {
	if (page2_done) return;
	console.log('page 2 callback');
	
	$("#game_page").find('td').each(function(td, obj) {
		if (obj.onclick) {
			obj.onclick();
			page2_done = true;
			return false;
		}
	});

	if (!page2_done) {
		window.setTimeout (function() {
			firstSubmit(window.location.search.substr(6), '');
			console.log('retry');
		}, retry_interval);
		return;
	}

	var page3_done = false;
	$(document).ajaxComplete(function() {
		if (page3_done) return;
		console.log('page 3 callback');
		$("#game_page").find('tr').each(function(td, obj) {
			if (obj.onclick) {
				obj.onclick();
				page3_done = true;
				return false;
			}
		});

		$(document).ajaxComplete(function() {
			console.log('page 4 callback');
			$("#game_page").find('select')[0].value = ticket_count;
			$("#game_page").find('select')[0].onchange();
			$("#game_page").find('a')[1].onclick();
		});
	});
});
}; 

autoPurchase(1000, 1);
