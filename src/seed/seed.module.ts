import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [BooksModule, UsersModule],
})
export class SeedModule {}
