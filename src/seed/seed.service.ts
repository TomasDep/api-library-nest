import { Injectable } from '@nestjs/common';

import { BooksService } from '../books/books.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly bookService: BooksService) {}

  public async runSeed(): Promise<string> {
    this.insertData();
    return 'Seed executed';
  }

  private async insertData(): Promise<boolean> {
    await this.bookService.deleteAllBooksData();
    const books = initialData.products;
    const insertPromises = [];
    books.forEach((book) => {
      insertPromises.push(this.bookService.create(book));
    });
    await Promise.all(insertPromises);
    return true;
  }
}
