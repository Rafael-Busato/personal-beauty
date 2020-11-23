/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('services_types')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  service_type: string;

  @Column('text', {
    array: true,
  })
  sub_service: [];

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
