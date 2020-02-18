import React from 'react';
import ReactDOM from 'react-dom';
import { TagCounter } from './tag-counter.js';
import * as browser from 'webextension-polyfill';
import MutationSummary from 'mutation-summary';
import { Logger } from "tubecentric-extension-lib";

Logger.info("Start of tag-counter");

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.type === 'URL_CHANGE') {

    const pathname = new URL(request.url).pathname;
    if(isVideoEditUrl(pathname)) {

      Logger.info("Background script says url changed");
      startApp();
    }
  }
});

if(isVideoEditUrl(window.location.pathname)) {
  Logger.info("window location path is video edit url");
  startApp();
}

function isVideoEditUrl(pathname) {
  return new RegExp(/\/video\/[\S]*\/edit/i).test(pathname);
}

function startApp() {

  Logger.info("Looing for #container #left")
  var left = document.querySelector("#left.ytcp-video-metadata-basics");

  if(left) {

    attachApp();

  }else {

    Logger.info("Starting observer on nodes below #left");
    var observer = new MutationSummary({
      callback: function() {
        Logger.info("Found #left div")
        attachApp();
      },
      queries: [
        {
          element: "div#left.ytcp-video-metadata-basics",
        }
      ]
    });
  }
}

function attachApp() {

  Logger.info("Attaching app, checking if #tagCounter exists");
  if(!document.querySelector('#tagCounter')) {

    Logger.info("#tagCounter does not exisit");

    const container = document.querySelector("#container #left");
    const app = document.createElement('div');
    app.id = "tagCounter";
    container.insertBefore(app, container.firstChild);

    ReactDOM.render(<TagCounter />, app);

    Logger.info("TagCounter app attached.");
  }
}
