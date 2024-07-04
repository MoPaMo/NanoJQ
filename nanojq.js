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
    el: function (index) {
      if (index === undefined) {
        return this.elements;
      } else if (
        typeof index === "number" &&
        index >= 0 &&
        index < this.elements.length
      ) {
        return this.elements[index];
      } else {
        return null;
      }
    },
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
    toggle: function () {
      this.elements.forEach((el) => {
        if (el && el.style)
          el.style.display = el.style.display === "none" ? "" : "none";
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
    css: function (prop, value) {
      if (typeof prop === "object") {
        this.elements.forEach((el) => {
          for (let key in prop) {
            if (el && el.style) el.style[key] = prop[key];
          }
        });
      } else if (value === undefined) {
        return this.elements[0] && window.getComputedStyle
          ? window.getComputedStyle(this.elements[0])[prop]
          : null;
      } else {
        this.elements.forEach((el) => {
          if (el && el.style) el.style[prop] = value;
        });
      }
      return this;
    },
    val: function (value) {
      if (value === undefined) {
        if (this.elements[0]) {
          if (
            this.elements[0].type === "checkbox" ||
            this.elements[0].type === "radio"
          ) {
            return this.elements[0].checked;
          } else {
            return this.elements[0].value;
          }
        }
        return undefined;
      } else {
        this.elements.forEach((el) => {
          if (el.type === "checkbox" || el.type === "radio") {
            el.checked = !!value;
          } else {
            el.value = value;
          }
        });
        return this;
      }
    },

    submit: function () {
      this.elements.forEach((el) => {
        if (el.tagName.toLowerCase() === "form") {
          el.submit();
        }
      });
      return this;
    },
    text: function (content) {
      if (content === undefined) {
        return this.elements.map((el) => el.textContent).join("");
      } else {
        this.elements.forEach((el) => {
          el.textContent = content;
        });
        return this;
      }
    },

    html: function (content) {
      if (content === undefined) {
        return this.elements[0] ? this.elements[0].innerHTML : "";
      } else {
        this.elements.forEach((el) => {
          el.innerHTML = content;
        });
        return this;
      }
    },
  };

  window.$ = NanoJQ;
  window._ = console.log.bind(console);
})(window);
