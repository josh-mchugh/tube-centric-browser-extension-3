export class DomObserver {

  constructor(selector, callback, options) {

    if(!options) {
      options = {
        childList: true,
        subtree: true,
        characterData: true
      };
    }

    this.selector = selector;
    this.options = options;
    this.observer = new MutationObserver(callback);
  }

  observe() {

    this.observer.observe(document.querySelector(this.selector), this.options);

    return this;
  }

  disconnect() {

    this.observer.disconnect();
  }
}
