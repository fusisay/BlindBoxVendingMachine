import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { BlindBox } from './BlindBox';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  productPrice: number;

  @Column()
  productImgUrl: string;

  @Column()
  productStock: number;

  @ManyToMany(() => BlindBox, (blindBox) => blindBox.products)
  blindBoxes: BlindBox[];

}