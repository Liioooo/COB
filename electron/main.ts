import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';

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

}

    //create mainMenubar
    const template = [
        {
            label: 'Window',
            submenu: [
            {
                label: 'About',
                click: function() {
                    try
                    {
                    }catch(e){}
                }
            },
            {
                label: 'Preferences',
                accelerator: process.platform === 'darwin' ? 'Command+,' : 'Ctrl+,',
                click: function() {
                    try
                    {
                    }catch(e){}
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+F4',
                click: function() {
                    try
                    {
                        app.quit();
                    }catch(e){}
                }
            }
            ]
        },
        {
            label: 'File',
            submenu: [
            {
                label: 'Open',
                accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
                click: function() {
                    try{
                    }catch(e){}
                }
            },
            {
                label: 'New',
                accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
                click: function() {
                    try{
                    }catch(e){}
                }
            },
            {
                label: 'Save',
                accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
                click: function() {
                    try{
                    }catch(e){}
                }
            },
            {
                label: 'Save as',
                accelerator: process.platform === 'darwin' ? 'Command+shift+S' : 'Ctrl+shift+S',
                click: function() {
                    try{
                    }catch(e){}
                }
            },
            {
                label: 'Close',
                accelerator: process.platform === 'darwin' ? 'Command+W' : 'Ctrl+W',
                click: function() {
                    try{
                    }catch(e){}
                }
            }
            ]
        },
        {
            label: 'Page',
            submenu: [
            {
                label: 'Add',
                accelerator: process.platform === 'darwin' ? 'Command+P' : 'Ctrl+P',
                click: function() {
                    try
                    {
                    }catch(e){}
                }
            },
            {
                label: 'Delete',
                accelerator: process.platform === 'darwin' ? 'Command+backspace' : 'delete',
                click: function() {
                    try
                    {
                    }catch(e){}
                }
            },
            {
                label: 'Copy',
                accelerator: process.platform === 'darwin' ? 'Command+C' : 'Ctrl+C',
                click: function() {
                    try
                    {
                    }catch(e){}
                }
            },
            {
                label: 'Cut',
                accelerator: process.platform === 'darwin' ? 'Command+X' : 'Ctrl+X',
                click: function() {
                    try
                    {
                    }catch(e){}
                }
            }
            ]
        },
        {
            label: 'Help',
            submenu: [
            {
                label: 'Help',
                accelerator: process.platform === 'darwin' ? 'F1' : 'F1',
                click: function() {
                    try
                    {
                    }catch(e){}
                }
            }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

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
