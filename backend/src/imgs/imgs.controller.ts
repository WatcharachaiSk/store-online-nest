import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, UploadedFiles } from '@nestjs/common';
import { ImgsService } from './imgs.service';
import * as _ from 'lodash';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { uniqueSuffixString } from 'func/unique-string';
import { FOLDERPATH } from 'src/constant/folder-path';
import { unlink } from 'fs/promises'; // ใช้ fs/promises เพื่อให้ได้เป็น Promise-based API
import * as mime from 'mime-types';

@Controller('imgs')
export class ImgsController {
  constructor(private readonly imgsService: ImgsService) { }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: FOLDERPATH.Imgs, // แก้เป็น path ที่ต้องการเก็บไฟล์
      filename: (req, file, cb) => {
        const uniqueSuffix = uniqueSuffixString();
        const extension = path.extname(file.originalname);
        const filename = `${uniqueSuffix}${extension}`;
        cb(null, filename);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // ตรวจสอบประเภทไฟล์ก่อนอัพโหลด
    const allowedFileTypes = ['.png', '.jpeg', '.jpg'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (!allowedFileTypes.includes(fileExt)) {
      const filePath = `${FOLDERPATH.Imgs}/${file.filename}`
      try {
        await unlink(filePath); // ใช้ unlink เพื่อลบไฟล์
        console.log(`File ${filePath} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
        throw new Error(`Failed to delete file ${filePath}`);
      }
      throw new BadRequestException('Invalid file type');
    }
    // ทำสิ่งที่ต้องการกับไฟล์ที่อัพโหลด
    // เช่น เก็บข้อมูลในฐานข้อมูลหรือประมวลผลไฟล์
    // ส่งคืนข้อมูลหรือตอบกลับตามที่ต้องการ
    return { message: 'File uploaded successfully', filename: file.filename };
  }

  @Post('/uploads')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: FOLDERPATH.Imgs, // แก้เป็น path ที่ต้องการเก็บไฟล์
      filename: (req, file, cb) => {

        console.log("file is ", file);

        const uniqueSuffix = uniqueSuffixString();
        const extension = path.extname(file.originalname);
        const filename = `${uniqueSuffix}${extension}`;
        cb(null, filename);
      },
    }),
  }))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    // ตรวจสอบประเภทของไฟล์ที่อัปโหลด
    const allowedFileTypes = ['.png', '.jpeg', '.jpg'];
    const response = {
      successfully: [],
      failed: []
    }
    for (const file of files) {
      const extension = path.extname(file.originalname).toLowerCase();
      if (!allowedFileTypes.includes(extension)) {
        const filePath = `${FOLDERPATH.Imgs}/${file.filename}`
        try {
          await unlink(filePath); // ใช้ unlink เพื่อลบไฟล์
          console.log(`File ${filePath} deleted successfully`);
        } catch (error) {
          console.error(`Error deleting file ${filePath}:`, error);
          throw new Error(`Failed to delete file ${filePath}`);
        }
        // throw new BadRequestException('Invalid file type');
        response.failed.push(file.originalname)
      } else {
        response.successfully.push(file.originalname)
      }
    }
    return response;
  }
}
