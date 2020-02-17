import React from 'react';
import ReactDOM from 'react-dom';
import { TagCounter } from './tag-counter.js';
import * as browser from 'webextension-polyfill';
import MutationSummary from 'mutation-summary';

console.log("Start of tag-counter");

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.type === 'URL_CHANGE') {

    const pathname = new URL(request.url).pathname;
    if(isVideoEditUrl(pathname)) {

      console.log("Background script says url changed");
      startApp();
    }
  }
});

if(isVideoEditUrl(window.location.pathname)) {
  console.log("window location path is video edit url");
  startApp();
}

function isVideoEditUrl(pathname) {
  return new RegExp(/\/video\/[\S]*\/edit/i).test(pathname);
}

function startApp() {

  console.log("Looing for #container #left")
  var left = document.querySelector("#left.ytcp-video-metadata-basics");

  if(left) {

    attachApp();

  }else {

    console.log("Starting observer on nodes below #left");
    var observer = new MutationSummary({
      callback: function() {
        console.log("Found #left div")
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

  console.log("Attaching app, checking if #tagCounter exists");
  if(!document.querySelector('#tagCounter')) {

    console.log("#tagCounter does not exisit");

    const container = document.querySelector("#container #left");
    const app = document.createElement('div');
    app.id = "tagCounter";
    container.insertBefore(app, container.firstChild);

    ReactDOM.render(<TagCounter />, app);

    console.log("TagCounter app attached.");
  }
}
