# Markan.js

Markan.js is a jQuery plugin to add dialogs on text selection. Inspired by Medium and RapGenius. See demo on http://carlosrocha.github.io/markan.js/

## Installation

Include both the javascript and css file into your page.

```html
<link rel="stylesheet" href="markan.css">

<script src="markan.js"></script>
```

Initialize the elements:

```javascript
$('p.content').markan({
  dialog: 'any html or function to generate the element'
});
```

## Supported browsers

Tested on the latest versions of Safari, Chrome and Firefox.
