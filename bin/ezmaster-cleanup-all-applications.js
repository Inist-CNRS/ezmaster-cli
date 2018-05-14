#!/usr/bin/env node

var ezmaster = require('../index.js');
ezmaster.setupNoProxyStuff();

const EZMASTER_BASEURL  = ezmaster.EZMASTER_BASEURL;
const EZMASTER_USER     = ezmaster.EZMASTER_USER;
const EZMASTER_PASSWORD = ezmaster.EZMASTER_PASSWORD;

var request = require('request');
var url = EZMASTER_BASEURL + '/-/v1/app';
console.log('Getting app list from ezmaster-api:', url);
request.get(url, function (error, response, apps) {
  if (error) return console.error(error);
  apps = JSON.parse(apps);
  apps.forEach(function (app) {
    const imageId = app.imageId;
    const imageName = app.imageName;
    if (!imageId || !imageName) return;
    const url = EZMASTER_BASEURL + '/-/v1/app/' + new Buffer(imageName).toString('base64');
    console.log('DELETE', url);
    request.delete(url, function (error, response, deleteDone) {
      console.log('app deleted: ' + app, response.statusMessage, deleteDone)
    });
  });
});