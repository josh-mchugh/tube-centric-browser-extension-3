const axios = require('axios');
const browser = require("webextension-polyfill");

browser.runtime.onMessage.addListener(function(message, sender, sendResponse){

    if(message.type === 'SEARCH_KEYWORDS') {
        
        axios.request({
            method: "get",
            baseURL: process.env.BASE_URL,
            url: "/api/v1/tag-search",
            params: {
              query: message.query
            }
          })
          .then(function (response) {
              sendResponse(response);
          })
          .catch(function (error) {
              console.log(error);
          });

        return true;
    }

    return false;
});
