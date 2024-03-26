import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity.ts';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  // if we want to add a coffe with a flavor that does not exists, we can use cascading inserts (cascade: true)
  // by using the comment below we can say that cascade will only works for insert
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // ['insert']
  })
  flavors: Flavor[];
}
