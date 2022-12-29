import { S3 } from 'aws-sdk';
import { Injectable, Logger } from '@nestjs/common';
// import { dirname } from 'path';

/* eslint-disable @typescript-eslint/no-var-requires */

const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// ffmpeg.setFfmpegPath(ffmpegPath.path);

// const fs = require('fs').promises;

@Injectable()
export class FileService {
    async upload(file: Express.Multer.File): Promise<unknown> {
        const { originalname } = file;
        const bucketS3 = process.env.AWS_BUCKET;
        return await this.uploadS3(file.buffer, bucketS3, originalname);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async uploadS3(file, bucket, name): Promise<unknown> {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    Logger.error(err);
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }

    getS3() {
        return new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'ap-southeast-1',
        });
    }

    // async downloadFromS3(key: string) {
    //     const params = {
    //         Bucket: process.env.AWS_BUCKET,
    //         Key: key,
    //     };
    //     const s3 = this.getS3();
    //     const logger = new Logger();
    //     const appDir = dirname(require.main.path);
    //     const location = `${appDir}/assets/${key}`;
    //     logger.log('WAITING DOWNLOAD');
    //     console.log(location);
    //     // const file = fs.createWriteStream(location);
    //     const { Body } = await s3.getObject(params).promise();
    //     console.log('RUN HERE');
    //     await fs.writeFile(location, Body);
    //     console.log('SAVE DONE');
    //     await ffmpeg(location)
    //         .output(location + '-1280x720.mp4')
    //         .videoCodec('libx264')
    //         .size('1280x720')
    //
    //         .output(location + '-1920x1080.mp4')
    //         .videoCodec('libx264')
    //         .size('1920x1080')
    //
    //         .on('error', function (err) {
    //             console.log('An error occurred: ' + err.message);
    //         })
    //         .on('progress', function (progress) {
    //             console.log('... frames: ' + progress.frames);
    //         })
    //         .on('end', function () {
    //             console.log('Finished processing');
    //         })
    //         .run();
    //     console.log('CONVER COMPLETE');
    // }
}
