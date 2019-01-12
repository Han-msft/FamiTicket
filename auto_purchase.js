var autoPurchase = function(retry_interval, date, time, ticket_count) {
//page 1
var firstSubmit = submitData;
submitData(window.location.search.substr(6), '');

var page2_done = false;
$(document).ajaxComplete(function() {
	if (page2_done) return;
	console.log('page 2 callback');
	
	$("#game_page").find('td').each(function(td, el) {
		if (!el.onclick) {
			return true;
		}
		
		if (date && el.parentNode.firstChild.innerHTML.search(date) < 0) {
			return true;	
		}
		
		if (time && el.parentNode.children[1].innerHTML.search(time) < 0) {
			return true;	
		}
		
		el.onclick();
		page2_done = true;
		return false;
	});

	if (!page2_done) {
		window.setTimeout (function() {
			firstSubmit(window.location.search.substr(6), '');
			console.log('retry');
		}, retry_interval || 1000);
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
		
		if (!page3_done) {
			window.setTimeout (function() {
				firstSubmit(window.location.search.substr(6), '');
				console.log('retry');
			}, retry_interval || 1000);
			return;
		}

		$(document).ajaxComplete(function() {
			console.log('page 4 callback');
			$("#game_page").find('select')[0].value = ticket_count || 1;
			$("#game_page").find('select')[0].onchange();
			$("#game_page").find('a')[1].onclick();
		});
	});
});
}; 

//first date, first seat, one ticket
autoPurchase(1000);
//select date, no time, 2 ticket
//autoPurchase(1000, '4/07', '', 2)


