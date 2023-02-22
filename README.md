# Modalis

Modal dialog with built in loading of HTML.

### Usage

First copy `modal.css` and `app.js` to your app assets. See `app/layouts/modal.js` for some working HTML you can use.

Add an empty div tag with the class name `modal` in your layout:
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

### Load modal content from DOM

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

This technique requires a modal layout to included in the DOM:
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
