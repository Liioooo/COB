const fs = require('fs');
const path = require('path');

const index = path.join(__dirname, 'dist', 'index.html');

let data = fs.readFileSync(index).toString();
data = data.replace(/src="/g, 'src=\"jsmod://');
fs.writeFileSync(index, data);