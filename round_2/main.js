var socket = io.connect('http://192.168.1.120:8000');
var APIKey = '4ef35b52b2813bcf';


var loadWeather = function(response){

	if(response.response.error){
		alert(response.response.error.description);
		return;
	}

	var temp = response.current_observation.temp_f + '°';

	console.log('The temperature in New York is ' + temp);

	$('.temperature').text(temp);

};



var getWeather = function(){

	var thisURL = 'http://api.wunderground.com/api/' + APIKey + '/conditions/q/NY/New_York.json';

	$.ajax({
		url : thisURL,
		dataType : "jsonp",
		success : function(response){
			loadWeather(response);
		}
	});

};

var sendTemp = function(response){

	var thisURL = 'http://api.wunderground.com/api/' + APIKey + '/conditions/q/NY/New_York.json';

	$.ajax({
		url : thisURL,
		dataType : "jsonp",
		success : function(response){

			var currentTemp = response;
			socket.emit('temp', { temp: currentTemp });
		}
	});


};


var init = function(){

	getWeather();

	var sendButton = document.getElementById("send");

	sendButton.addEventListener('click', function(e){

		e.preventDefault();
		console.log('now emitting!');
		sendTemp();

	});

};


$( document ).ready(function(){

	init();

});