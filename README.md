# ZFodler
Zip all files inside folder


Node module that recursively zips files inside given folder.


## Installation
```bash
npm install zfolder
```



## API

```javascript
await ZFolder(folder[, zip_path, options])
```


### folder   
**Type**: _String_   


### zip_path
**Type**: _String_   


### options   
**Type**: _Object_   
- `recursive` <_Boolean_>  If `false`, then nested files would be ignored. `true` by default



### @return   
**Type**: _Object_   
Returns path to zip-archive and total zipped files
```
{
  zip_path: Z:/ ... /test.zip,
  total: 805
}
```



## Usage
```javascript
const ZFolder = require('zfolder');

let files_list = await ZFolder('./test/');
```



