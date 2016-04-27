var crypto    = require('crypto')
var url       = require('url')
var moment    = require('moment')
var  util     = require('util')
var _         = require('underscore')
var request   = require('request')
var weixinUtil = require('../util')

var SEED_TOKEN = "THECATSMEOW1234";

function handleOfficial(req, res, next) {
  console.log("handleOfficial() received params: "); 
  console.dir(req.query);
  var input = computeInput(req.query);
  console.log("computed input: " + input)
  var shasum = crypto.createHash('sha1');
  shasum.update(input);
  var computedHash = shasum.digest('hex');
  console.log("computedHash: " + computedHash)
  if(computedHash == req.query.signature) {
    res.send(req.query.echostr, 200);
  }
  else 
    res.send(401)
  next();
};

function computeInput(params) {
  return SEED_TOKEN.split('').sort().join('') + params.timestamp.split('').sort().join('') + params.nonce.split('').sort().join('');
}


module.exports = function (server) {
  server.get('/official*', handleOfficial);
};

