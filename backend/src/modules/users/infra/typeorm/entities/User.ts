/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column()
  occupation: string;
  @Column()
  bank: string;

  @Column()
  phone: string;
  @Column()
  zipCode: string;
  @Column()
  neighborhood: string;

  @Column()
  state: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  agency: string;

  @Column()
  account: string;

  @Column()
  document: string;

  @Column()
  fullname: string;

  @Column()
  price: string;

  @Column({ array: true })
  service_type: string;

  @Column({ array: true })
  sub_service: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose()
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}

export default User;
