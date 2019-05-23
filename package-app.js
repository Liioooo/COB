const platform = process.argv[2];
const arch = process.argv[3];

if (!platform || !arch) {
  process.exit();
}

const packager = require('electron-packager');

const options = {
  'arch': arch,
  'platform': platform,
  'dir': './dist',
  'app-copyright': 'HTL Rennweg',
  'asar': true,
  'icon': './icons/icon256.ico',
  'name': 'COB',
  'out': './release',
  'overwrite': true,
  'prune': true,
  'version-string':{
    'CompanyName': 'HTL Rennweg',
    'FileDescription': 'COB',
    'OriginalFilename': 'COB',
    'ProductName': 'COB',
    'InternalName': 'COB'
  }
};

packager(options)
  .then(console.log)
  .catch(console.log);