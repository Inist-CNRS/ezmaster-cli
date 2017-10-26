#!/usr/bin/env node

var ezmaster = require('../index.js');
ezmaster.setupNoProxyStuff();

const EZMASTER_BASEURL = process.env.EZMASTER_BASEURL ? process.env.EZMASTER_BASEURL : "http://127.0.0.1:35267";

var request = require('request');
request.get(EZMASTER_BASEURL + '/-/v1/app', function (error, response, apps) {
  apps = JSON.parse(apps);
  apps.forEach(function (app) {
    const APPLICATION_BASENAME = app.imageName.split(':').shift();
    if (!APPLICATION_BASENAME) return;
    ezmaster.downloadAndCreateLatestApplication(APPLICATION_BASENAME, function (err, APPLICATION_NAME) {
      if (!APPLICATION_NAME) return;
      console.log(APPLICATION_NAME, 'Installed.');
    });
  });
});
