var Parse = require('node-parse-api').Parse;
var APP_ID = "t6QATVAhXYgvqboc92rbbDnFen97qFLsSUhRZSkM";
var MASTER_KEY = "rAt8hiJmnbMwhRbhxECHQelEhSblP6DHtztJ8Jrp";
var appParse = new Parse(APP_ID, MASTER_KEY);

var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;


var port = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]


///create server
app.use(express.static(__dirname + ''));
console.log('Simple static server listening at '+url+':'+port);

app.get('', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('YOUR SERVER IS RUNNING')

});


io.sockets.on('connection', function (socket) {
  //open port for sensor data
  port.open(function(error) {

    if (error) {
      console.log('failed to open: ' + error);
  } else {
    console.log('Serial open');


  socket.on('weather1', function (data) {
    console.log("chance of rain is: " + data.pop + " %");

    ////send the info out the port to the Arduino
    // port.write("T"+data.temp + " W"+ data.wind + "R"+ data.rain+" \n");

  });

    socket.on('weather2', function (data) {
    console.log("temp is: " + data.temp);


  });

  }//end else

  });//end port

  });//socket on end Bracket