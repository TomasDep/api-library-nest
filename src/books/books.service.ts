import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { isUUID } from 'class-validator';
import { DataSource, Repository } from 'typeorm';

import { PaginatioDto } from 'src/common/dtos/pagination.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Genre } from './entities/genre.entity';

@Injectable()
export class BooksService {
  private readonly logger = new Logger('BoobsService');

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    private readonly dataSource: DataSource,
  ) {}

  public async create(createBookDto: CreateBookDto) {
    try {
      const { genres = [], ...bookDetails } = createBookDto;
      const book = this.bookRepository.create({
        genres: genres.map((name: string) =>
          this.genreRepository.create({ name }),
        ),
        ...bookDetails,
      });
      await this.bookRepository.save(book);
      return { ...book, genres };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  public async findAll(paginationDto: PaginatioDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const books = await this.bookRepository.find({
      take: limit,
      skip: offset,
      relations: {
        genres: true,
      },
    });

    return books.map((book: Book) => ({
      ...book,
      genres: book.genres.map((genre: Genre) => genre.name),
    }));
  }

  public async findOne(term: string): Promise<Book> {
    let book: Book;

    if (isUUID(term)) {
      book = await this.bookRepository.findOneBy({ id: term });
    } else {
      const query = this.bookRepository.createQueryBuilder('book');
      book = await query
        .where('UPPER(book.name) =:name or slug =:slug', {
          name: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('book.genres', 'genres')
        .getOne();
    }

    if (!book) {
      throw new NotFoundException(`Book "${term}" not found"`);
    }

    return book;
  }

  public async findOneBook(value: string) {
    const { genres = [], ...rest } = await this.findOne(value);
    return { ...rest, genres: genres.map((genre: Genre) => genre.name) };
  }

  public async update(id: string, updateBookDto: UpdateBookDto) {
    const { genres, ...bookUpdate } = updateBookDto;
    const book = await this.bookRepository.preload({ id, ...bookUpdate });

    if (!book) {
      throw new NotFoundException(`Book with id: ${id} not found`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (genres) {
        await queryRunner.manager.delete(Genre, { book: { id } });
        book.genres = genres.map((name) =>
          this.genreRepository.create({ name }),
        );
      }

      await queryRunner.manager.save(book);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.findOneBook(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleExceptions(error);
    }
  }

  public async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }

  public async deleteAllBooksData() {
    const query = this.bookRepository.createQueryBuilder('book');
    try {
      return query.delete().where({}).execute();
    } catch (error) {
      this.handleExceptions(error);
    }
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
