import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';

import { PaginatioDto } from 'src/common/dtos/pagination.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  private readonly logger = new Logger('BoobsService');

  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  public async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const book = this.bookRepository.create(createBookDto);
      await this.bookRepository.save(book);
      return book;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  public findAll(paginationDto: PaginatioDto): Promise<Book[]> {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.bookRepository.find({
      take: limit,
      skip: offset,
    });
  }

  public async findOne(term: string): Promise<Book> {
    let book: Book;

    if (isUUID(term)) {
      book = await this.bookRepository.findOneBy({ id: term });
    } else {
      const query = this.bookRepository.createQueryBuilder();
      book = await query
        .where('UPPER(name) =:name or slug =:slug', {
          name: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .getOne();
    }

    if (!book) {
      throw new NotFoundException(`Book "${term}" not found"`);
    }

    return book;
  }

  public async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.preload({
      id,
      ...updateBookDto,
    });

    if (!book) {
      throw new NotFoundException(`Book with id: ${id} not found`);
    }

    try {
      await this.bookRepository.save(book);
      return book;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  public async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }

  private handleExceptions(error: any): void {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
