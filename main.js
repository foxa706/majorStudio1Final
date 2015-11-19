var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='localhost';
var server = app.listen(port);
// var io = require("socket.io").listen(server);


// var serialport = require("serialport");
// var SerialPort = serialport.SerialPort;

// var gpio=require("pi-gpio");

// stopMotors = false;

var APIKey = '4ef35b52b2813bcf';


// gpio.open(16,"output",function(err){
//   console.log("Pin 16 open"); // Opens pin 16 as output
// });

// gpio.open(18,"output",function(err){
//   console.log("Pin 18 open"); // Opens pin 18 as output
// });


var loadTemp = function(response){

    if(response.response.error){
        alert(response.response.error.description);
        return;
    };

    var temp = response.current_observation.temp_f + '°';

    console.log('The temperature in New York is ' + temp);

    // $('.temperature').text(temp);

};



var getTemp = function(){

    var thisURL = 'http://api.wunderground.com/api/' + APIKey + '/conditions/q/NY/New_York.json'

    $.ajax({
        url : thisURL,
        dataType : "jsonp",
        success : function(response){
            loadTemp(response);
        }
    });

};


// function sleep(milliseconds) {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     if ((new Date().getTime() - start) > milliseconds){
//       break;
//     }
//   }
// }


// // Runs motor in the set direction
// function move() {
//    gpio.write(16, 1, function() {
//         sleep(1000);
//          gpio.write(16, 0, function() {
//             sleep(1000);
//             if(!stopMotors)move();
//         });
//       });
// }

// function stopMotor() {
//   stopMotors = true;
// }

// // Changing direction of motor
// function left() {
//   stopMotors = false;
//   console.log("pin 18 motor activated")
//   // gpio.write(18, 1, function() {
//   //     move();
//   // });
// }

// // Changing direction of motor
// function right() {
//   stopMotors = false;
//     console.log("pin 18 motor off")
//   // gpio.write(18, 0, function() {
//   //     move();
//   });
// }


// //setLocation function
// var setLocation = function(){

//     //define the current city
//     city = $('.currentCity').val();
//     if(city == null || city == ''){

//         alert('You ned to list a city!');
//         return;

//     };
//     state = $('.currentState').val();

//     console.log('You want the weather for ' + city + ', ' + state);
//     getWeather();

// };


//init

// var init = function(){

//     console.log('What\'s the weather?');

//     $('#submit').click(function(e){
//         e.preventDefault();
//         setLocation();
//     });

// };


$( document ).ready(function(){

    getTemp();

});