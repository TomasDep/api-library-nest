import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { Genre } from './entities/genre.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [TypeOrmModule.forFeature([Book, Genre]), AuthModule],
  exports: [BooksService],
})
export class BooksModule {}
