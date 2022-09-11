import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Book } from 'src/books/entities/book.entity';

@Entity('genres')
export class Genre {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Book id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    example: 'Horror',
    description: 'Book genre',
  })
  @Column('text')
  name: string;
  @ManyToOne(() => Book, (book) => book.genres, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  book: Book;
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
