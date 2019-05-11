const platform = process.argv[2];

if (!platform) {
  process.exit();
}

const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1)
  });

function getInstallerConfig () {
  console.log(`creating ${platform} installer`);
  const rootPath = path.join('./');
  const outPath = path.join(rootPath, 'release');

  return Promise.resolve({
    appDirectory: path.join(outPath, `COB-win32-${platform}`),
    authors: 'HTL Rennweg',
    noMsi: true,
    outputDirectory: path.join(outPath, `installer-win32-${platform}`),
    exe: 'COB.exe',
    setupExe: `COBInstaller-win-${platform}.exe`,
    setupIcon: path.join(rootPath, 'icons', 'icon256.ico'),
    description: 'Create Question Files easily',
    iconUrl: 'https://github.com/Liiioooo/COB/blob/master/icons/icon256.ico?raw=true',
    loadingGif: path.join(rootPath,'icons', 'icon256.png')
  });
}