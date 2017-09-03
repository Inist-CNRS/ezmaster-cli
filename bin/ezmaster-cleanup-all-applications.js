#!/usr/bin/env node

const EZMASTER_BASEURL = process.env.EZMASTER_BASEURL ? process.env.EZMASTER_BASEURL : "http://127.0.0.1:35267";

var request = require('request');
request.get(EZMASTER_BASEURL + '/-/v1/app', function (error, response, apps) {
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