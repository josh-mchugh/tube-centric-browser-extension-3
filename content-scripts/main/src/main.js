var browser = require("webextension-polyfill");

console.log("Hello from content script!");

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(JSON.stringify(request));
});

browser.runtime.sendMessage({greeting: "hello"})
  .then(function(response){
    console.log(response.farewell)
  });
