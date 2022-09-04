import { ApiProperty } from '@nestjs/swagger';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Genre } from './genre.entity';
import { User } from '../../users/entities/user.entity';

@Entity('books')
export class Book {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Book id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: 'Fire and Blood',
    description: 'Book title',
  })
  @Column('text')
  name: string;
  @ApiProperty({
    example:
      'Centuries before A Game of Thrones, an even greater game began, one that set the skies' +
      'alight with dragon flame and saw the Seven Kingdoms turned to ash.',
    description: 'Book description',
    nullable: true,
  })
  @Column('text', { nullable: true })
  description: string;
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'Book observations',
    nullable: true,
  })
  @Column('text', { nullable: true })
  observations: string;
  @ApiProperty({
    example: 10,
    description: 'Book stock',
    nullable: true,
  })
  @Column('int', { default: 0 })
  stock: number;
  @ApiProperty({
    example: true,
    description: 'Book status',
    nullable: true,
    default: 0,
  })
  @Column('boolean', { default: false })
  status: boolean;
  @ApiProperty({
    example: 26.9,
    description: 'Book price',
    nullable: true,
    default: false,
  })
  @Column('double precision', { default: 0 })
  price: number;
  @ApiProperty({
    example: 'fire-and-blood',
    description: 'Book slug',
    nullable: true,
    default: false,
  })
  @Column('text', { unique: true })
  slug: string;
  @ApiProperty({
    example: ['fantasy'],
    description: 'Book genres',
  })
  @OneToMany(() => Genre, (genre) => genre.book, { cascade: true, eager: true })
  genres: Genre[];
  @ManyToOne(() => User, (user) => user.books, { eager: true })
  user: User;
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

  @BeforeInsert()
  public checkSlugInsert(): void {
    if (!this.slug) {
      this.slug = this.name;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  public checkSlugUpdate(): void {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }
}
