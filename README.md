# Modalis

Modal dialog with built in loading of HTML.

### Usage

First copy `dist/assets/css/modal.css` and `dist/assets/js/modal.js` to your app assets. Use `dist/layouts/modal.js` for some working HTML you can use for your modal layout.

Included is also an example of a "prompt", for use with a modal inside the modal.

Add an empty div tag with the class name `modal` in your main app layout, before the end `</body>` tag:
```html
<div class="modal"></div>
```

To open the modal add an element like this:
```html
<button
  onclick="openModal(this)"
  data-modal=".modal"
  data-href="/modal"
>
  Open modal
</button>
```
The `data-modal` is the selector of your modal.

### Load modal content from server

If you want to load HTML into the modal, use `data-href` and add the path there.

Using a link the modal modal will be filled with the contents of the `href` attribute:
```html
<a
  onclick="openModal(this);return false"
  data-modal=".modal"
  href="/modal"
>
  Open modal
</a>
```

### Insert modal content from DOM

To load insert content from the DOM, use `data-source`:

```html
<button
  onclick="openModal(this)"
  data-modal=".modal"
  data-source=".content"
>
  Open modal
</button>
```

This technique requires a modal layout to be included in the DOM:
```html
<body>
  ...
  <div class="modal-layout">
    <div class="modal-frame">
      <div class="modal-border">
        <div class="modal-header">
          <button onclick="closeModal(this)" data-modal=".modal">Close</button>
        </div>
        <div class="modal-content"></div>
      </div>
    </div>
  </div>
</body>
```

The default selector for the modal layout is `.modal-layout`, but you can specify it like this:

```html
<button
  onclick="openModal(this)"
  data-modal=".modal"
  data-source=".content"
  data-layout=".my-layout"
>
  Open modal
</button>
```

The source of the modal content should only have 1 root element:

```html
<div id="content" style="display:none">
  <div id="root">
    The content to be inserted goes here.
  </div>
</div>
```

### Set modal title

To set or override the modal title, use the `data-title` attribute on your toggler:

```html
<button
  onclick="openModal(this)"
  data-title="Modal title"
  data-modal=".modal"
  data-source=".content"
  data-layout=".my-layout"
>
  Open modal
</button>
```

This is dependent on an element with a `modal-title` class in your modal layout.


### Close the modal

To close the modal use `closeModal`:
```html
<button
  onclick="closeModal(this)"
  data-modal=".modal"
>
  Close
</button>
```

or you can close it programmatically like this:
```js
// Pass selector of modal element
closeModal('.modal')
```

MIT Licensed. Enjoy!
