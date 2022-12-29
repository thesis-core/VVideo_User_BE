import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesController } from './files.controller';

@Module({
    imports: [],
    providers: [FileService],
    exports: [FileService],
    controllers: [FilesController],
})
export class FilesModule {}
