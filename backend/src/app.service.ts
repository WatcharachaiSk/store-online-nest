import { Injectable } from '@nestjs/common';
import { FOLDERPATH } from './constant/folder-path';
import * as fs from 'fs'
@Injectable()
export class AppService {
  constructor() {
    this.createFolder()
  }
  createFolder() {
    // check folder
    const folderPath = FOLDERPATH.Imgs;
    if (!fs.existsSync(folderPath)) {
      // create folder path
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
