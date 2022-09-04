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
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text', { unique: true })
  email: string;
  @Column('text', { unique: true })
  username: string;
  @Column('text', { select: false })
  password: string;
  @Column('boolean', { default: true })
  isActive: boolean;
  @Column('text', { nullable: false })
  fullname: string;
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
