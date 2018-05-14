#!/usr/bin/env node

var ezmaster = require('../index.js');
ezmaster.setupNoProxyStuff();

const EZMASTER_BASEURL = process.env.EZMASTER_BASEURL ? process.env.EZMASTER_BASEURL : "http://127.0.0.1:35269";

var request = require('request');
var url = EZMASTER_BASEURL + '/-/v1/app';
console.log('Getting app list from ezmaster-api:', url);
request.get(url, function (error, response, apps) {
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