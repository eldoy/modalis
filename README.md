# Dialogis

Modal dialog with built in loading of HTML.

### Usage

First copy `dialog.css` and `app.js` to your app assets. See `app/layouts/dialog.js` for some working HTML you can use.

Add an empty div tag with the class name `dialog` in your layout:
```html
<div class="dialog"></div>
```

To open the dialog add an element like this:
```html
<button
  onclick="openDialog(this)"
  data-dialog=".dialog"
  data-href="/dialog">
  Open dialog
</button>
```
The `data-dialog` is the selector of your dialog. If you want to load HTML into the dialog, use `data-href` and add the path there.

Using a link the modal dialog will be filled with the contents of the `href` attribute:
```html
<a
  onclick="openDialog(this);return false"
  data-dialog=".dialog"
  href="/dialog">
  Open dialog
</a>
```

To close the dialog use `closeDialog`:
```html
<button
  onclick="closeDialog(this)"
  data-dialog=".dialog">
  Close
</button>
```

or you can close it programmatically like this:
```js
// Pass selector of dialog element
closeDialog('.dialog')
```

MIT Licensed. Enjoy!
