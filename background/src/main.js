var browser = require("webextension-polyfill");

console.log("Hello background script!");

browser.runtime.onInstalled.addListener(details => {
  console.log("previousVersion", details.previousVersion);
});

browser.runtime.onMessage.addListener(function(message, sender ,sendResponse) {
  console.log("Background onMessage listener.");
  console.log(message.greeting);
  sendResponse({farewell: "Good bye!"})
  return true;
  // Make a request for a user with a given ID
  //axios.get('http://localhost:8080/api/v1/tag-search?query=test')
  //  .then(function (response) {
  //
  //  sendResponse(response);
  //  })
  //  .catch(function (error) {
  //    console.log(error);
  //  });

  //  return true;
});
