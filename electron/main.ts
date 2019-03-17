import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';
import {getTemplate} from './menu-bar';

let win: BrowserWindow;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(path.join(__dirname, `../../node_modules/electron`))
        });
        win.webContents.openDevTools();
        win.loadURL('http://localhost:4200');
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../../dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    win.on('closed', () => {
        win = null;
    });

    const menu = Menu.buildFromTemplate(getTemplate(win.webContents));
    Menu.setApplicationMenu(menu);
}

try {
    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (win === null) {
            createWindow();
        }
    });

} catch (e) {}
