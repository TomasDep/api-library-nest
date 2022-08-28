import { join } from 'path';
import { existsSync } from 'fs';

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  public getStaticBookImage(imageName: string) {
    const path: string = join(__dirname, '../../static/uploads', imageName);

    if (!existsSync(path))
      throw new BadRequestException(`No image found for ${imageName}`);

    return path;
  }
}
