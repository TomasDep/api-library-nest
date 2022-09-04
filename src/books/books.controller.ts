import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '../auth/decorators/auth.decorator';
import { PaginatioDto } from '../common/dtos/pagination.dto';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { Book } from './entities/book.entity';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Add new books' })
  @ApiResponse({ status: 201, description: 'Created', type: Book })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, token related' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post()
  @Auth(ValidRoles.ADMIN)
  public create(@Body() createBookDto: CreateBookDto, @GetUser() user: User) {
    return this.booksService.create(createBookDto, user);
  }

  @ApiOperation({
    summary: 'Get a list of books, optionally retrieve paginated',
  })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  public findAll(@Query() paginationDto: PaginatioDto) {
    return this.booksService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Get a book by id, name or slug' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get(':term')
  public findOne(@Param('term') term: string) {
    return this.booksService.findOneBook(term);
  }

  @ApiOperation({ summary: 'Get a book by id and update its information' })
  @ApiResponse({ status: 201, description: 'Created', type: Book })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, token related' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Patch(':id')
  @Auth(ValidRoles.ADMIN)
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
    @GetUser() user: User,
  ) {
    return this.booksService.update(id, updateBookDto, user);
  }

  @ApiOperation({ summary: 'Delete a book by id' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden, token related' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Delete(':id')
  @Auth(ValidRoles.ADMIN)
  public remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
