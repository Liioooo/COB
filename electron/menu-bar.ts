import {MenuItemConstructorOptions, BrowserWindow} from 'electron';
import {openAbout, openHelp} from './help-about-windows';

export function getTemplate(win: BrowserWindow, serve: boolean): MenuItemConstructorOptions[] {
  return [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Öffnen',
          accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'openFile');
          }
        },
        {
          label: 'Neu',
          accelerator: process.platform === 'darwin' ? 'Command+shift+N' : 'Ctrl+shift+N',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'newFile');
          }
        },
        {
          label: 'Speichern',
          accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'save');
          }
        },
        {
          label: 'Speichern unter',
          accelerator: process.platform === 'darwin' ? 'Command+shift+S' : 'Ctrl+shift+S',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'saveAs');
          }
        },
        {type: 'separator'},
        {
          label: 'Minimieren',
          click: () => {
            win.minimize();
          }
        },
        {
          label: 'Maximieren',
          click: () => {
            win.maximize();
          }
        },
        {
          label: 'Verkleinern',
          click: () => {
            win.unmaximize();
          }
        },
        {
          label: 'Schließen',
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+F4',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'close');
          }
        }
      ]
    },
    {
      label: 'Bearbeiten',
      submenu: [
        {
          label: 'Neue Seite',
          accelerator: 'CmdOrCtrl+N',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'newPage');
          }
        },
        {
          label: 'Löschen',
          accelerator: process.platform === 'darwin' ? 'Command+backspace' : 'delete',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'deletePage');
          }
        },
        {
          label: 'Kopieren',
          accelerator: 'CmdOrCtrl+C',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'copyPage');
          }
        },
        {
          label: 'Ausschneiden',
          accelerator: 'CmdOrCtrl+X',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'cutPage');
          }
        },
        {
          label: 'Einfügen',
          accelerator: 'CmdOrCtrl+V',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'pastePage');
          }
        }
      ]
    },
    {
      label: 'Auswahl',
      submenu: [
        {
          label: 'Alles Auswählen',
          accelerator: 'CmdOrCtrl+A',
          registerAccelerator: false,
          click: () => {
            win.webContents.send('menuClick', 'selectAll');
          }
        },
        {
          label: 'Auswahl aufheben',
          click: () => {
            win.webContents.send('menuClick', 'clearSelection');
          }
        }
      ]
    },
    {
      label: 'Hilfe',
      submenu: [
        {
          label: 'Hilfe',
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
