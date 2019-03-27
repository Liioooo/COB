import {BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';

export function openAbout(serve: boolean) {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 750,
        minHeight: 500,
        webPreferences: {
            nodeIntegration: false
        }
    });
    win.setMenu(null);

    if (serve) {
        win.webContents.openDevTools();
        win.loadURL('http://localhost:4200/assets/docs/about.html');
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../../dist/assets/docs/about.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    win.on('closed', () => {
        win = null;
    });
}

export function openHelp(serve: boolean) {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 750,
        minHeight: 500,
        webPreferences: {
            nodeIntegration: false
        }
    });
    win.setMenu(null);

    if (serve) {
        win.webContents.openDevTools();
        win.loadURL('http://localhost:4200/assets/docs/help.html');
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../../dist/assets/docs/help.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    win.on('closed', () => {
        win = null;
    });
}
