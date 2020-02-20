import React from 'react';
import ReactDOM from 'react-dom';
import { TagCounter } from './tag-counter.js';
import * as browser from 'webextension-polyfill';
import MutationSummary from 'mutation-summary';
import { Logger } from "tubecentric-extension-lib";

Logger.info("tag-counter started");

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.type === 'URL_CHANGE') {

    Logger.info("URL has changed: ", request.url);
    const pathname = new URL(request.url).pathname;
    if(isVideoEditUrl(pathname)) {
      startEditApp();
    }
    if(isVideoUpload(pathname)) {
      startUploadApp();
    }
  }
});

if(isVideoEditUrl(window.location.pathname)) {
  Logger.info("window location path: video edit");
  startEditApp();
}

if(isVideoUpload(window.location.pathname)) {
  Logger.info("window location path: videos upload");
  startUploadApp();
}

function isVideoEditUrl(pathname) {
  return new RegExp(/\/video\/[\S]*\/edit/i).test(pathname);
}

function isVideoUpload(pathname) {
  return new RegExp(/\/channel\/[\S]*\/videos\/upload[\S]*/i).test(pathname);
}

function startEditApp() {

  const targetElement = "div#left.ytcp-video-metadata-basics";
  
  Logger.info("Looking for: ", targetElement);
  if(document.querySelector(targetElement)) {

    Logger.info("Found ", targetElement);
    attachEditApp();
    return;
  }

  Logger.info("Unable to find ", targetElement);
  Logger.info("Starting observer for: ", targetElement);

  var observer = new MutationSummary({
    callback: function() {
      Logger.info("Found ", targetElement);
      attachEditApp();
    },
    queries: [
      {
        element: targetElement,
      }
    ]
  });
}

function startUploadApp() {

  const targetElement = "div.left-col";

  Logger.info("Starting observer for: ", targetElement);

  var observer = new MutationSummary({
    callback: function() {
      Logger.info("Found ", targetElement);
      attachUploadApp();
    },
    queries: [
      {
        element: targetElement
      }
    ]
  });
}

function attachEditApp() {

  const appId = "tagCounterEdit";

  Logger.info("Looking for element with ID: ", appId);
  if(!document.getElementById(appId)) {

    Logger.info("Element with ID '" + appId + "' count not be found.");

    const container = document.querySelector("#container #left");
    const app = document.createElement('div');
    app.id = appId;
    container.insertBefore(app, container.firstChild);

    ReactDOM.render(<TagCounter location="edit"/>, app);

    Logger.info("App attached with ID: ", app);
  }
}

function attachUploadApp() {

  const appId = "tagCounterUpload";

  Logger.info("Looking for element with ID: ", appId);
  if(!document.getElementById(appId)) {

    Logger.info("Element with ID '" + appId + "' count not be found.");

    const container = document.querySelector("#basics.ytcp-uploads-details");
    const app = document.createElement('div');
    app.id = appId;
    container.insertBefore(app, container.querySelector(".title-textarea"));

    ReactDOM.render(<TagCounter location="upload"/>, app);

    Logger.info("App attached with ID: ", app);
  }
}
