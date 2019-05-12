import * as childProcess from 'child_process';
import * as path from 'path';
import {App} from 'electron';

export function handleSquirrelEvents(serve: boolean, app: App) {
  if (serve || process.argv.length === 1) {
    return false;
  }

  if (process.platform !== 'win32') {
    return false;
  }

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.resolve(path.join(rootAtomFolder, 'app-' + require(path.join(__dirname, '../package.json')).version + '/COB.exe'));

  const spawn = (command, args) => {
    let spawnedProcess;

    try {
      spawnedProcess = childProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = args => {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];

  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      createFileAssoc(exeName, rootAtomFolder, () => {
        setTimeout(app.quit, 1000);
      });
      return true;

    case '--squirrel-uninstall':
      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      removeFileAssoc(() => {
        setTimeout(app.quit, 1000);
      });
      return true;

    case '--squirrel-obsolete':
      app.quit();
      return true;
    default:
      return false;
  }
}

function createFileAssoc(exeName: string, rootAtomFolder: string, finished: () => void) {
  const Registry = require('winreg');

  const fileKey = new Registry({
    hive: Registry.HKCU,
    key: '\\Software\\Classes\\.cob'
  });
  fileKey.create(err => {
    const appKey = new Registry({
      hive: Registry.HKCU,
      key: '\\Software\\Classes\\Applications\\COB.exe'
    });
    appKey.create(err1 => {
      const assoc = new Registry({
        hive: Registry.HKCU,
        key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.cob'
      });
      assoc.create(err2 => {
        const openKey = new Registry({
          hive: Registry.HKCU,
          key: `\\Software\\Classes\\Applications\\COB.exe\\shell\\open\\command`
        });
        openKey.set('', Registry.REG_SZ, `\"${exeName}\" %1`, err3 => {
          const iconKey = new Registry({
            hive: Registry.HKCU,
            key: `\\Software\\Classes\\Applications\\COB.exe\\DefaultIcon`
          });
          iconKey.set('', Registry.REG_SZ, `${rootAtomFolder}\\app.ico`, err4 => {
            const assocChoice = new Registry({
              hive: Registry.HKCU,
              key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.cob\\UserChoice'
            });
            assocChoice.set('ProgId', Registry.REG_SZ, 'Applications\\COB.exe', err5 => { finished(); });
          });
        });
      });
    });
  });
}

function removeFileAssoc(finished: () => void) {
  const Registry = require('winreg');

  const fileKey = new Registry({
    hive: Registry.HKCU,
    key: '\\Software\\Classes\\.cob'
  });
  fileKey.destroy(err => {
    const appKey = new Registry({
      hive: Registry.HKCU,
      key: '\\Software\\Classes\\Applications\\COB.exe'
    });
    appKey.destroy(err1 => { finished(); });
  });
}
