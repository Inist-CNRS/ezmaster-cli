#!/usr/bin/env node

// Script used to autonomate latest application creation 
// from the latest dockerhub published tag.
// And to automaticaly create a new instance from this app.
// 
// Example call:
// APPLICATION_BASENAME="istex/istex-dl" INSTANCE_BASENAME="istex-dl" CONFIG_FROM_INSTANCE="istex-dl-2" node auto-create-new-version.js

var ezmaster = require('../index.js');

const APPLICATION_BASENAME = process.env.APPLICATION_BASENAME ? process.env.APPLICATION_BASENAME : "istex/istex-dl";
const INSTANCE_BASENAME    = process.env.INSTANCE_BASENAME ? process.env.INSTANCE_BASENAME : "istex-dl";
const CONFIG_FROM_INSTANCE = process.env.CONFIG_FROM_INSTANCE ? process.env.CONFIG_FROM_INSTANCE    : "";

ezmaster.downloadAndCreateLatestApplication(APPLICATION_BASENAME, function (err, APPLICATION_NAME) {
  if (!APPLICATION_NAME) return;
  ezmaster.getLatestInstanceVersion(INSTANCE_BASENAME, function (err, version) {
    ezmaster.getGithubTagComment(APPLICATION_BASENAME, APPLICATION_NAME.split(':')[1], function (err, versionComment) {
      // check if this version should be skipped
      if (versionComment.indexOf('#ezskip') !== -1) {
        console.log('Skipping auto ezmaster instance creation: ' 
          + APPLICATION_NAME + ' => ' + versionComment);
        return;
      }
      const NEW_INSTANCE = INSTANCE_BASENAME + '-' + (version+1);
      ezmaster.createNewInstance(
        versionComment ? versionComment : 'Version ' + APPLICATION_NAME,
        NEW_INSTANCE,
        APPLICATION_NAME, function (err) {
          // initialize config if necessary
          if (CONFIG_FROM_INSTANCE) {
            ezmaster.getInstanceDetailsFromName(CONFIG_FROM_INSTANCE, function (err, instanceDetails) {
              ezmaster.updateInstanceConfig(NEW_INSTANCE, instanceDetails.config, function (err) {
                console.log('Finished');
              });
            });
          } else {
            console.log('Finished');
          }
        }
      );
    });
  });
});

//ezmaster.updateInstanceConfig("istex-dl-2", { lol: "stuff" });
//ezmaster.getInstanceDetailsFromTechnicalName("istex-dl-2", console.log);