# NanoJQ

📦 A tiny, lightweight JavaScript framework inspired by jQuery

## 🌟 Features

🔥 Blazing fast
🎯 Focused functionality
🪶 Lightweight (<1 KB gzipped)
🌐 Cross-browser compatible

## 🚀 Getting Started
Just add this script to your header:

```html
<script src="https://github.com/MoPaMo/NanoJQ/raw/main/nanojq.min.js"></script>
```

## API Reference

### Selector

Use `$(selector)` to select elements. The selector can be a CSS selector string, an array of elements, or a single element.

### Methods

#### .el(index)

Returns the element at the specified index, or the entire array of elements if no index is provided.

#### .remove()

Removes all selected elements from the DOM.

#### .hide()

Hides all selected elements.

#### .show()

Shows all selected elements.

#### .toggle()

Toggles the visibility of all selected elements.

#### .on(event, callback)

Adds an event listener to all selected elements.

#### .attr(name, value)

Gets or sets the value of an attribute for the selected elements.

#### .css(prop, value)

Gets or sets CSS properties for the selected elements.

#### .val(value)

Gets or sets the value of form elements.

#### .submit()

Submits the first form element in the selection.

#### .text(content)

Gets or sets the text content of the selected elements.

#### .html(content)

Gets or sets the HTML content of the selected elements.

## Usage Example

```javascript
// Select all paragraphs and add a click event
$('p').on('click', function() {
  $(this).css('color', 'red');
});

// Hide all elements with class 'hidden'
$('.hidden').hide();

// Get the value of an input
var inputValue = $('input#username').val();

// Set the HTML content of a div
$('#content').html('<p>New content</p>');

// Toggle visibility of elements
$('.toggle-me').toggle();
```
