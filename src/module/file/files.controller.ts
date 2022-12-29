import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';

import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('files')
@ApiTags('files')
export class FilesController {
    constructor(private fileService: FileService) {}

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.upload(file);
    }

    // @Get('test')
    // async test() {
    //     const appDir = dirname(require.main.path);
    //     return this.fileService.downloadFromS3('foo.mp4');
    // }
}
