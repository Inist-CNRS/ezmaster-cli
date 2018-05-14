#!/usr/bin/env node

var ezmaster = require('../index.js');
ezmaster.setupNoProxyStuff();

const EZMASTER_BASEURL  = ezmaster.EZMASTER_BASEURL;
const EZMASTER_USER     = ezmaster.EZMASTER_USER;
const EZMASTER_PASSWORD = ezmaster.EZMASTER_PASSWORD;

var request = require('request');
var url = EZMASTER_BASEURL + '/-/v1/instances';
console.log('Getting instances list from ezmaster-api:', url);
request.get(url, function (error, response, instances) {
  if (error) return console.error(error);
  instances = JSON.parse(instances);
  Object.keys(instances).forEach(function (instance) {
    const containerId = instances[instance].containerId;
    if (!containerId) return;
    request.delete(EZMASTER_BASEURL + '/-/v1/instances/' + containerId, function (error, response, deleteDone) {
      console.log('instance deleted: ' + instance, deleteDone)
    });
  });
});