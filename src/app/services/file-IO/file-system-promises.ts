import {PathLike} from "fs";
import * as fs from "fs";
import {ElectronService} from 'ngx-electron';
import {SaveDialogOptions, OpenDialogOptions} from 'electron';

export function readFile(path: PathLike): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    try {
      resolve(fs.readFileSync(path));
    } catch (e) {
      reject(e);
    }
  });
}

export function writeFile(path: PathLike, data: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      resolve(fs.writeFileSync(path, data, 'utf-8'));
    } catch (e) {
      reject(e);
    }
  });
}

export function getSavePath(es: ElectronService, options: SaveDialogOptions = {}): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      es.remote.dialog.showSaveDialog(null, options, (filename: string) => {
        if (!filename) {
          reject(Error('no file selected'));
          return;
        }
        resolve(filename);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function getPath(es: ElectronService, options: OpenDialogOptions = {}): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      es.remote.dialog.showOpenDialog(null, options, (filename: string[]) => {
        if (filename.length === 0) {
          reject(Error('no file selected'));
          return;
        }
        resolve(filename[0]);
      });
    } catch (e) {
      reject(e);
    }
  });
}
