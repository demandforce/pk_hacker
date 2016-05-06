
var bodyParser   = require("body-parser")
  , express      = require('express')
  , fs           = require('fs')
  , responseTime = require('response-time')
  , uuid         = require('node-uuid');

var app = express();

app.use(responseTime());

var PORT = process.env.API_PORT || 8000;

//relative path from the project root to the logging directory
var LOG_DIR = process.env.DFS_LOG_DIR || "log";
var REQUEST_LOG = "request.log";

/**** Express middleware  ****/
//app.use(bodyParser.json({ limit: '64mb' }));
//app.use(bodyParser.text({ limit: '64mb', type: 'application/xml' }));

//app.use(express.static(__dirname + '/static'));


//default unhandled exception handler
app.use(function(err, req, res, next) { 
  console.err(err);
  if(err.status == 400) {
    res.status(400).send({"error": "JSON"})
  }
  else {
    res.status(500).send({"error": "Internal error"})
  }
});

//Health check. Does not require authentication. Include first.
//require('./resource/health_check')(app);

//Core APIs
require('./resource/official')(app);

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('API server listening at http://%s:%s', host, port)
});

