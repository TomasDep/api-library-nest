import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Book } from '../../books/entities/book.entity';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'User id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: 'example@email.com',
    description: 'User email',
    uniqueItems: true,
    type: 'string',
  })
  @Column('text', { unique: true })
  email: string;
  @ApiProperty({
    example: 'userJo3123',
    description: 'Username',
    uniqueItems: true,
    type: 'string',
  })
  @Column('text', { unique: true })
  username: string;
  @ApiProperty({
    example: '123456aA',
    description: 'Password',
    uniqueItems: true,
    type: 'string',
  })
  @Column('text', { select: false })
  password: string;
  @ApiProperty({
    description: "Verification of the user's account is active or blocked",
    uniqueItems: true,
    type: 'boolean',
    default: true,
  })
  @Column('boolean', { default: true })
  isActive: boolean;
  @ApiProperty({
    example: 'John Doe',
    description: "User's full name",
    type: 'string',
    nullable: false,
  })
  @Column('text', { nullable: false })
  fullname: string;
  @ApiProperty({
    description: 'User role',
    type: 'array',
    default: ['user'],
  })
  @Column('text', { array: true, default: ['user'] })
  roles: string[];
  @OneToMany(() => Book, (book) => book.user)
  books: Book;
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
  public checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  public checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
