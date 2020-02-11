import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.type === 'URL_CHANGE') {

    const pathname = new URL(request.url).pathname;
    if(isVideoEditUrl(pathname)) {

      startApp();
    }
  }
});

if(isVideoEditUrl(window.location.pathname)) {
  startApp();
}

function isVideoEditUrl(pathname) {
  return new RegExp(/\/video\/[\S]*\/edit/i).test(pathname);
}

function startApp() {

  var left = document.querySelector("#container #left");

  if(left) {

    attachApp(left);

  }else {

    var observer = new MutationObserver(function(mutations) {

      mutations.forEach(mutation => {

        if(mutation.target.id === "left") {

          attachApp(mutation.target);

          this.disconnect();
        }
      });
    });

    observer.observe(document.getElementById("container"), {
        childList: true,
        subtree: true
    });
  }
}

function attachApp(element) {

  if(!element.querySelector('#tagSearch')) {

    const app = document.createElement('div');
    app.id = "tagSearch";
    element.insertBefore(app, element.querySelector(".tags"));

    ReactDOM.render(<App />, app);
  }
}
