import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @Column({default: "user"})
  role: "user" | "admin";

  @Column({default: 1})
  avatar: number;

  @Column({default: 0})
  balance: number;
}
