var browser = require("webextension-polyfill");
var $ = require("jquery");

console.log("Hello from content script!");

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(JSON.stringify(request));
});

$(function() {

  //setTimeout(function () {
  //  var body = $("body");

  //  const component = $("<app-hello-world>");
  //  $(body).prepend(component);

  //  const componentScript = $("<script>")
  //    .attr("type", "text/javascript")
  //    .attr("src", browser.runtime.getURL("/content-scripts/app/app.js"));
  //  componentScript.insertAfter(component);
  //}, 2000);
});
