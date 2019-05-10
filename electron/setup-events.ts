import * as childProcess from 'child_process';
import * as path from 'path';
import {App} from 'electron';

export function handleSquirrelEvents(serve: boolean, app: App) {
  if (serve || process.argv.length === 1) {
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

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
}
