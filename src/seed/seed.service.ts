import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BooksService } from '../books/books.service';
import { initialData } from './data/seed-data';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly bookService: BooksService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async runSeed(): Promise<string> {
    await this.deleteTables();
    const admin = await this.insertUsers();
    await this.insertData(admin);
    return 'Seed executed';
  }

  private async deleteTables(): Promise<void> {
    await this.bookService.deleteAllBooksData();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers(): Promise<User> {
    const seedUsers = initialData.users;
    const users: User[] = [];
    seedUsers.forEach((user: User) => {
      users.push(this.userRepository.create(user));
    });
    const dbUsers = await this.userRepository.save(seedUsers);
    return dbUsers[0];
  }

  private async insertData(user: User): Promise<boolean> {
    await this.bookService.deleteAllBooksData();
    const books = initialData.products;
    const insertPromises = [];
    books.forEach((book) => {
      insertPromises.push(this.bookService.create(book, user));
    });
    await Promise.all(insertPromises);
    return true;
  }
}
