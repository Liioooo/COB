import { MenuItemConstructorOptions, WebContents } from 'electron';

export function getTemplate(webContents: WebContents): MenuItemConstructorOptions[] {
    return [
        {
            label: 'Datei',
            submenu: [
                {
                    label: 'Öffnen',
                    // accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
                    click: () => {
                        webContents.send('menuClick', 'openFile');
                    }
                },
                {
                    label: 'Neu',
                    click: () => {
                        webContents.send('menuClick', 'newFile');
                    }
                },
                {
                    label: 'Speichern',
                    // accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
                    click: () => {
                        webContents.send('menuClick', 'save');
                    }
                },
                {
                    label: 'Speichern unter',
                    // accelerator: process.platform === 'darwin' ? 'Command+shift+S' : 'Ctrl+shift+S',
                    click: () => {
                        webContents.send('menuClick', 'saveAs');
                    }
                },
                {
                    label: 'Schließen',
                    // accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+F4',
                    click: () => {
                        webContents.send('menuClick', 'close');
                    }
                }
            ]
        },
        {
            label: 'Bearbeiten',
            submenu: [
                {
                    label: 'Neue Seite',
                    // accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        webContents.send('menuClick', 'newPage');
                    }
                },
                {
                    label: 'Löschen',
                    // accelerator: process.platform === 'darwin' ? 'Command+backspace' : 'delete',
                    click: () => {
                        webContents.send('menuClick', 'deletePage');
                    }
                },
                {
                    label: 'Kopieren',
                    // accelerator: 'CmdOrCtrl+C',
                    click: () =>  {
                        webContents.send('menuClick', 'copyPage');
                    }
                },
                {
                    label: 'Ausschneiden',
                    // accelerator: 'CmdOrCtrl+X',
                    click: () => {
                        webContents.send('menuClick', 'cutPage');
                    }
                },
                {
                    label: 'Einfügen',
                    // accelerator: 'CmdOrCtrl+V',
                    click: () => {
                        webContents.send('menuClick', 'pastePage');
                    }
                }
            ]
        },
        {
            label: 'Auswahl',
            submenu: [
                {
                    label: 'Alles Auswählen',
                    // accelerator: process.platform === 'darwin' ? 'Command+A' : 'Ctrl+A',
                    click: () => {
                        webContents.send('menuClick', 'selectAll');
                    }
                },
                {
                    label: 'Auswahl aufheben',
                    click: () => {
                        webContents.send('menuClick', 'clearSelection');
                    }
                }
            ]
        },
        {
            label: 'Hilfe',
            submenu: [
                {
                    label: 'Hilfe',
                    // accelerator: process.platform === 'darwin' ? 'F1' : 'F1',
                    click: () => {
                    }
                }
            ]
        }
    ];
}
