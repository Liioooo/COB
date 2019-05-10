const fs = require('fs');
const packageFile = require('./package.json');

const toWrite =
`
{
  "name": "${packageFile.name}",
  "version": "${packageFile.version}",
  "main": "electron/main.js",
  "dependencies": {
    
  }
}
`;

fs.writeFileSync('./dist/package.json', toWrite);