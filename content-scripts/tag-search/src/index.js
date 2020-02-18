import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as browser from 'webextension-polyfill';
import MutationSummary from 'mutation-summary';
import { Logger } from "tubecentric-extension-lib";

Logger.info("Start of tag-search");

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.type === 'URL_CHANGE') {

    const pathname = new URL(request.url).pathname;
    if(isVideoEditUrl(pathname)) {

      Logger.info("Background script says url changed.");
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
  var left = document.querySelector("#container #left");

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
  if(!document.querySelector('#tagSearch')) {

    Logger.info("#tagSearch does not exisit");

    const container = document.querySelector("#container #left");
    const app = document.createElement('div');
    app.id = "tagSearch";
    container.insertBefore(app, container.querySelector(".tags"));

    ReactDOM.render(<App />, app);
  }
}
