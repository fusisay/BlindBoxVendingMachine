import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Product } from './Product';


@Entity()
export class BlindBox {
    @PrimaryGeneratedColumn()
    blindBoxId: number;

    @Column()
    blindBoxName: string;

    @Column()
    blindBoxDescription: string;

    @Column()
    blindBoxImgUrl: string;

    @Column()
    blindBoxPrice: number;

    @ManyToMany(() => Product, (product) => product.blindBoxes)
    @JoinTable() // 必须加这个，表示 BlindBox 主导这个关系表
    products: Product[];

}