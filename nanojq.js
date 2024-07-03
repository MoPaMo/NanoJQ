(function (window) {
  function NanoJQ(selector) {
    if (!(this instanceof NanoJQ)) {
      return new NanoJQ(selector);
    }
    this.elements = document.querySelectorAll(selector);
    this.elements = this.elements.length > 1 ? this.elements : this.elements[0];
    return this;
  }

  // Alias for selector
  window.$ = NanoJQ;
})(window);
