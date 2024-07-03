(function (window) {
  function NanoJQ(selector) {
    if (!(this instanceof NanoJQ)) {
      return new NanoJQ(selector);
    }
    this.elements =
      typeof selector === "string"
        ? document.querySelectorAll(selector)
        : [].concat(selector);
    return this.elements.length === 1 ? this.elements[0] : this.elements;
  }

  NanoJQ.prototype = {
    hide: function () {
      this.elements.forEach((el) => (el.style.display = "none"));
      return this;
    },
    show: function () {
      this.elements.forEach((el) => (el.style.display = ""));
      return this;
    },
    on: function (event, callback) {
      this.elements.forEach((el) => el.addEventListener(event, callback));
      return this;
    },
  };

  // Extend element prototypes
  Element.prototype.hide = NanoJQ.prototype.hide;
  Element.prototype.show = NanoJQ.prototype.show;
  Element.prototype.on = NanoJQ.prototype.on;

  NodeList.prototype.hide = NanoJQ.prototype.hide;
  NodeList.prototype.show = NanoJQ.prototype.show;
  NodeList.prototype.on = NanoJQ.prototype.on;

  window.$ = NanoJQ;
  window._ = console.log.bind(console);
})(window);
