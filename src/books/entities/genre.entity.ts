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
  @PrimaryGeneratedColumn()
  id: number;
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
