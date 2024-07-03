(function (window) {
  function NanoJQ(selector) {
    if (!(this instanceof NanoJQ)) {
      return new NanoJQ(selector);
    }
    this.elements = document.querySelectorAll(selector);
    return this;
  }

  // Alias for selector
  window.$ = NanoJQ;
})(window);
