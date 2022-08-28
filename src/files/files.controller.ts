import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { diskStorage } from 'multer';

import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('book/:imageName')
  public findBookImage(
    @Res() response: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticBookImage(imageName);

    response.sendFile(path);
  }

  @Post('book')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/uploads',
        filename: fileNamer,
      }),
    }),
  )
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException('The file entered is not an image');

    const secureUrl = `${this.configService.get('HOST_API')}/files/book/${
      file.filename
    }`;

    return { secureUrl };
  }
}
