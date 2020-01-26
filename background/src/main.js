const browser = require("webextension-polyfill");
const tagSearch = require('./tag-search');

console.log("Hello background script!");

browser.runtime.onInstalled.addListener(details => {
  console.log("previousVersion", details.previousVersion);
});


browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  // Send message when url changes
  if (changeInfo.url) {

    const request = {
      type: 'URL_CHANGE',
      url: changeInfo.url
    };

    browser.tabs.sendMessage(tabId, request);
  }
});
