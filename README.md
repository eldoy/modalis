# Dialogis

Modal dialog. Based on [Micromodal](https://github.com/Ghosh/micromodal)

### Usage

First copy `dialog.css` and `app.js` to your app assets.

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

MIT Licensed. Enjoy!
