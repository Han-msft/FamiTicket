var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://code.jquery.com/jquery-1.12.4.js';
document.head.appendChild(script);

function postFWT0010(code){ 
	$.ajax({
		type: "POST",
		url: "FWT/FWT0010.aspx",
		data: {
			activitycode: code,
			gameid: ''
		},
		success: function(msg){
			if(!msg) {
				postFWT0010(code);
				console.log('fail');
				return false
			}

			console.log(msg.match(/[^(,]+(?=\')/g));
		}
	});
};

function postFWT0020(activity, game_id){
	$.ajax({
		type: "POST",
		url: "FWT/FWT0020.aspx",
		data: {
			game_id: game_id,
			activitycode: activity
		},
		success: function(msg){
			if(!msg) {
				postFWT0010(code);
				console.log('fail');
				return false
			}

			
		},
		error: function(request, error, status){   

		}
	});
}

postFWT0010("1901Z04001");
