import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Indexes allow faster search
 * We need to use the index decorator in the column
 * For more advanced search and combinations, we can use at the class level the index decorator with an array
 */

@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
