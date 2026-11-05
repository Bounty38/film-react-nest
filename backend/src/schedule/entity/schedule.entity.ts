import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Films } from '../../films/entity/film.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: string;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column('double precision')
  price: number;

  @Column({
    type: 'text',
    transformer: {
      to(value: string[]): string {
        return value.join();
      },
      from(value: string): string[] {
        return !value ? [] : value.split(',');
      },
    },
  })
  taken: string[];

  @ManyToOne(() => Films, (film) => film.schedule)
  film: Films;
}
