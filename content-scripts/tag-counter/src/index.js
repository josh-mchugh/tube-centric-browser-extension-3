import React from 'react';
import ReactDOM from 'react-dom';
import { TagCounter } from './tag-counter.js';

var left = document.getElementById("left");

if(left) {

  startApp(left);

}else {

  var observer = new MutationObserver(function(mutations) {

    mutations.forEach(mutation => {

      console.log("mutation target id: " + mutation.target.id);
      if(mutation.target.id === "left") {

          startApp(mutation.target);

        this.disconnect();
      }
    });
  });

  observer.observe(document.body, {
      childList: true,
      subtree: true
  });
}


function startApp(element) {

  const app = document.createElement('div');
  element.insertBefore(app, element.firstChild);

  ReactDOM.render(<TagCounter />, app);
}
