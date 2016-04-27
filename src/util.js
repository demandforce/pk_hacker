
var request = require("request");

var APP_ID = "wx49ada8d07fac40eb";
var APP_SECRET = "7bc1eaa9191ebc002f3f291e430e3a76";
var TOKEN_API = "https://api.wechat.com/cgi-bin/token?grant_type=client_credential"

exports.getToken = function(done) {
  console.log("getToken()");
  var options = { 
    url: TOKEN_API,
    qs: { appid: APP_ID, secret: APP_SECRET }
  }
  request(options, function (error, response, body) {
    done(error, body)
  })
}

