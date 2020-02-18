const browser = require("webextension-polyfill");
const tagSearch = require('./tag-search');
const { Logger } = require("tubecentric-extension-lib");

Logger.info("Hello background script!");

browser.runtime.onInstalled.addListener(details => {
  Logger.info("previousVersion", details.previousVersion);
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
