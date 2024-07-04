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
    /**
     * Returns the element at the specified index, or the entire array of elements if no index is provided.
     *
     * @param {number|undefined} index - The index of the element to return. If not provided, returns the entire array.
     * @return {Array|Element|null} - The element at the specified index, or the entire array of elements, or null if the index is invalid.
     */
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
/**
 * Removes all elements in the `elements` array from their parent nodes.
 *
 * @return {Object} The current instance of the object.
 */
      remove() {
        this.elements.forEach((el) => {
          if (el && el.parentNode) el.parentNode.removeChild(el);
        });
        return this;
      }
    /**
     * Hides all the elements in the `elements` array by setting their `display` style property to "none".
     *
     * @return {Object} Returns the current instance of the object.
     */
    hide: function () {
      this.elements.forEach((el) => {
        if (el && el.style) el.style.display = "none";
      });
      return this;
    },
    /**
     * Sets the `display` style property to an empty string for all elements in the `elements` array, making them visible.
     *
     * @return {Object} Returns the current instance of the object.
     */
    show: function () {
      this.elements.forEach((el) => {
        if (el && el.style) el.style.display = "";
      });
      return this;
    },
    /**
     * Toggles the visibility of all elements in the `elements` array by setting their `display` style property to either an empty string or "none".
     *
     * @return {Object} Returns the current instance of the object.
     */
    toggle: function () {
      this.elements.forEach((el) => {
        if (el && el.style)
          el.style.display = el.style.display === "none" ? "" : "none";
      });
      return this;
    },
    /**
     * Adds an event listener to all elements in the `elements` array for the specified event, and executes the provided callback function when the event is triggered.
     *
     * @param {string} event - The name of the event to listen for.
     * @param {function} callback - The function to execute when the event is triggered.
     * @return {Object} Returns the current instance of the object.
     */
    on: function (event, callback) {
      this.elements.forEach((el) => {
        if (el && el.addEventListener) el.addEventListener(event, callback);
      });
      return this;
    },
    /**
     * Get or set the value of an attribute of the first element in the `elements` array.
     *
     * @param {string} name - The name of the attribute.
     * @param {any} value - The value to set the attribute to. If not provided, the function returns the value of the attribute.
     * @return {any|Object} - If `value` is provided, returns the current instance of the object. If `value` is not provided, returns the value of the attribute or `null` if the attribute does not exist.
     */
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
    /**
     * Sets the CSS properties of the elements in the `elements` array.
     *
     * @param {Object|string} prop - An object containing CSS property-value pairs or a string representing the CSS property.
     * @param {string} [value] - The value to set the CSS property to. Required if `prop` is a string.
     * @return {Object} The current instance of the object.
     */
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
    /**
     * Get or set the value of the first element in the `elements` array.
     *
     * @param {any} value - The value to set. If not provided, the function returns the value of the first element.
     * @return {any|Object} - If `value` is provided, returns the current instance of the object. If `value` is not provided, returns the value of the first element or `undefined` if the array is empty.
     */
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

    /**
     * Submits the first form element in the `elements` array if it exists.
     *
     * @return {Object} The current instance of the object.
     */
    submit: function () {
      this.elements.forEach((el) => {
        if (el.tagName.toLowerCase() === "form") {
          el.submit();
        }
      });
      return this;
    },
    /**
     * Sets the text content of all elements in the `elements` array to the provided `content`.
     * If no `content` is provided, returns the text content of all elements in the array joined together.
     *
     * @param {string|undefined} content - The text content to set for all elements in the array.
     * @return {Object} Returns the current instance of the object.
     */
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

    /**
     * Sets the HTML content of all elements in the `elements` array to the provided `content`.
     * If no `content` is provided, returns the HTML content of the first element in the array.
     *
     * @param {string|undefined} content - The HTML content to set for all elements in the array.
     * @return {Object} Returns the current instance of the object.
     */
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
