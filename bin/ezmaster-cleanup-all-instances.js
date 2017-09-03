#!/usr/bin/env node

const EZMASTER_BASEURL = process.env.EZMASTER_BASEURL ? process.env.EZMASTER_BASEURL : "http://127.0.0.1:35267";

var request = require('request');
request.get(EZMASTER_BASEURL + '/-/v1/instances', function (error, response, instances) {
  instances = JSON.parse(instances);
  Object.keys(instances).forEach(function (instance) {
    const containerId = instances[instance].containerId;
    if (!containerId) return;
    request.delete(EZMASTER_BASEURL + '/-/v1/instances/' + containerId, function (error, response, deleteDone) {
      console.log('instance deleted: ' + instance, deleteDone)
    });
  });
});