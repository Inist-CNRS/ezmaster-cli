#!/usr/bin/env node

var ezmaster = require('../index.js');
ezmaster.setupNoProxyStuff();

const EZMASTER_BASEURL = ezmaster.EZMASTER_BASEURL;

var request = require('request');
var url = EZMASTER_BASEURL + '/-/v1/app';
console.log('Getting app list from ezmaster-api:', url);
request.get(url, ezmaster.request_option, function (error, response, apps) {
  if (error) return console.error(error);
  apps = JSON.parse(apps);
  apps.forEach(function (app) {
    const APPLICATION_BASENAME = app.imageName.split(':').shift();
    if (!APPLICATION_BASENAME) return;
    console.log('Downloading latest app:', APPLICATION_BASENAME)
    ezmaster.downloadAndCreateLatestApplication(APPLICATION_BASENAME, function (err, APPLICATION_NAME) {
      if (!APPLICATION_NAME) return;
      console.log(APPLICATION_NAME, 'Installed.');
    });
  });
});
