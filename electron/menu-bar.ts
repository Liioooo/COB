import {MenuItemConstructorOptions, BrowserWindow} from 'electron';
import {openAbout, openHelp} from './help-about-windows';

export function getTemplate(win: BrowserWindow, serve: boolean): MenuItemConstructorOptions[] {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'openFile');
          }
        },
        {
          label: 'New',
          accelerator: process.platform === 'darwin' ? 'Command+shift+N' : 'Ctrl+shift+N',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'newFile');
          }
        },
        {
          label: 'Save',
          accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'save');
          }
        },
        {
          label: 'Save As...',
          accelerator: process.platform === 'darwin' ? 'Command+shift+S' : 'Ctrl+shift+S',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'saveAs');
          }
        },
        {
          label: 'Export',
          accelerator: process.platform === 'darwin' ? 'Command+shift+S' : 'Ctrl+shift+E',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'export');
          }
        },
        {
          label: 'Import',
          accelerator: process.platform === 'darwin' ? 'Command+shift+S' : 'Ctrl+shift+I',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'import');
          }
        },
        {type: 'separator'},
        {
          label: 'Minimize',
          click: () => {
            win.minimize();
          }
        },
        {
          label: 'Maximize',
          click: () => {
            win.maximize();
          }
        },
        {
          label: 'Unmaximize',
          click: () => {
            win.unmaximize();
          }
        },
        {
          label: 'Close',
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+F4',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'close');
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'New Page',
          accelerator: 'CmdOrCtrl+N',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'newPage');
          }
        },
        {
          label: 'Delete',
          accelerator: process.platform === 'darwin' ? 'Command+backspace' : 'delete',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'deletePage');
          }
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'copyPage');
          }
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'cutPage');
          }
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'pastePage');
          }
        }
      ]
    },
    {
      label: 'Selection',
      submenu: [
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'selectAll');
          }
        },
        {
          label: 'Clear Selection',
          click: () => {
            win.webContents.send('menuClick', 'clearSelection');
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Help',
          click: () => {
            openHelp(serve);
          }
        },
        {
          label: 'About',
          click: () => {
            openAbout(serve);
          }
        }
      ]
    }
  ];
}
