/*!
 * ZFolder, http://tpkn.me/
 */
const fs = require('fs');
const path = require('path');
const Zip = require('yazl');
const ReadDirRec = require('readdirrec');


/**
 * @param   {String}  folder
 * @param   {String}  zip_path
 * @param   {Object}  options
 * @return  {Object}
 */
async function ZFolder(folder, zip_path, options = {}){
   if(typeof folder !== 'string'){
     return new TypeError('folder path should a string');
   }

   if(!fs.existsSync(folder) || !fs.lstatSync(folder).isDirectory()){
      return new TypeError('folder does not exist');
   }

   // Set input folder name and path as output zip file
   if(typeof zip_path !== 'string' || path.extname(zip_path) !== '.zip'){
      let folder_parts = path.parse(folder);
      zip_path = path.join(folder_parts.dir, folder_parts.name + '.zip');
   }


   // Options
   let { filter = {}, recursive = true } = options;
      
   // Read folder
   let files_list = await ReadDirRec(folder, { filter, recursive });

   return new Promise((resolve, reject) => {
      let zip = new Zip.ZipFile();
      let zip_stream = zip.outputStream.pipe(fs.createWriteStream(zip_path));
      
      zip_stream.on('close', () => {
         resolve({ path: zip_path });
      });
      
      for(let i = 0, len = files_list.length; i < len; i++){
         let file = files_list[i];
         let file_zipped = path.normalize(file).replace(path.normalize(folder), '').replace(/^[\\\/]+/, '');

         zip.addFile(file, file_zipped);
      }

      zip.end();
   })
}

module.exports = ZFolder;
