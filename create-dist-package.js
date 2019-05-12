const fs = require('fs');
const packageFile = require('./package.json');

const toWrite = `
{
  "name": "${packageFile.name}",
  "version": "${packageFile.version}",
  "main": "electron/main.js",
  "dependencies": ${JSON.stringify(packageFile.dependencies, null, 2)}
}
`;

fs.writeFileSync('./dist/package.json', toWrite);