# bootstrap-modal-browser

Item select dialog for modal.js on bootstrap v3.x

## Examples

### Trigger

modalBrowser.show(id, url, title, class, height)

```html
<input type="button" class="btn btn-primary" onclick="modalBrowser.show('sample', 'browse.html', 'Title', null, 320)" value="Browse">
```

### Register Callback

modalBrowser.appendCallback(id, callback)

```javascript
<script>
modalBrowser.appendCallback('sample', function (str, test){
    $('#item').html('<strong>' + str + '</strong> selected');
});
</script>
```


### Browser side(iFrame)

```html
<a href="javascript:void(0)" class="list-group-item" onclick="returnSelected('item1')">item 1</a>

<script>
function returnSelected(str){
    var args = [str];
    parent.modalBrowser.call(args);
    parent.modalBrowser.close();
}
</script>
```
