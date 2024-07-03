(function (window) {
  function NanoJQ(selector) {
    if (!(this instanceof NanoJQ)) {
      return new NanoJQ(selector);
    }
    this.elements =
      typeof selector === "string"
        ? document.querySelectorAll(selector)
        : [].concat(selector);
    return this;
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
  };

  const handler = {
    get: function (target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return function (...args) {
        let results = target.elements.map((el) => {
          if (typeof el[prop] === "function") {
            return el[prop](...args);
          } else {
            return el[prop];
          }
        });

        // If the result is a DOM element or a list of DOM elements, wrap it in NanoJQ
        if (
          results.some((r) => r instanceof Element || r instanceof NodeList)
        ) {
          return new Proxy(new NanoJQ(results.flat()), handler);
        }

        return results.length > 1 ? results : results[0];
      };
    },
    set: function (target, prop, value) {
      target.elements.forEach((el) => {
        el[prop] = value;
      });
      return true;
    },
  };

  function createNanoJQ(selector) {
    return new Proxy(new NanoJQ(selector), handler);
  }

  window.$ = createNanoJQ;
  window._ = console.log.bind(console);
})(window);
