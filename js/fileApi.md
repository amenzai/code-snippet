fileApi

## 代码示例

html
```html
<form id="file-form" action="handler.php" method="POST">
  <input type="file" id="file-select" name="photos[]" multiple onchange="handleChanage()"/>
  <button type="submit" id="upload-button">上传</button>
</form>
```
js
```js
var fileSelect = document.getElementById('file-select')
function handleChanage(e) {
  var files = fileSelect.files
  var formData = new FormData();

  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // if (!file.type.match('image')) {
    //   continue;
    // }

    formData.append('photos[]', file, file.name);
  }
  console.log(formData)
}

var formData = new FormData();
formData.append('name','tom');
formData.append('age','12');
```