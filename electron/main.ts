import {app, BrowserWindow, Menu, ipcMain} from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import {getTemplate} from './menu-bar';
import {handleSquirrelEvents} from './setup-events';

let win: BrowserWindow;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

if (!handleSquirrelEvents(serve, app)) {
  setOpenedPath();
  try {
    app.on('ready', createWindow);

    app.on('activate', () => {
      if (win === null) {
        createWindow();
      }
    });

  } catch (e) {}
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 750,
    minHeight: 500,
    webPreferences: {
      // devTools: false should be set in production
      // devTools: false
      nodeIntegration: true
    }
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(path.join(__dirname, `../../node_modules/electron`))
    });
    win.webContents.openDevTools();
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.on('closed', () => {
    app.quit();
  });

  const menu = Menu.buildFromTemplate(getTemplate(win, serve));
  win.setMenu(menu);
}

function setOpenedPath() {
  let openedPath = args[0];
  if (!fs.existsSync(openedPath)) {
    openedPath = null;
  }
  ipcMain.on('getOpenedPath', () => {
    win.webContents.send('getOpenedPathResponse', openedPath);
  });
}
