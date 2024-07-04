(function (window) {
  function NanoJQ(selector) {
    if (!(this instanceof NanoJQ)) {
      return new NanoJQ(selector);
    }

    this.elements =
      typeof selector === "string"
        ? Array.from(document.querySelectorAll(selector))
        : Array.isArray(selector)
        ? selector
        : [selector];

    return this;
  }

  NanoJQ.prototype = {
    hide: function () {
      this.elements.forEach((el) => {
        if (el && el.style) el.style.display = "none";
      });
      return this;
    },
    show: function () {
      this.elements.forEach((el) => {
        if (el && el.style) el.style.display = "";
      });
      return this;
    },
    on: function (event, callback) {
      this.elements.forEach((el) => {
        if (el && el.addEventListener) el.addEventListener(event, callback);
      });
      return this;
    },
    attr: function (name, value) {
      if (value === undefined) {
        // Getter
        return this.elements[0] && this.elements[0].getAttribute
          ? this.elements[0].getAttribute(name)
          : null;
      } else {
        // Setter
        this.elements.forEach((el) => {
          if (el && el.setAttribute) el.setAttribute(name, value);
        });
        return this;
      }
    },
  };

  window.$ = NanoJQ;
  window._ = console.log.bind(console);
})(window);
