import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Schedules } from '../../schedule/entity/schedule.entity';

@Entity()
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision')
  rating: number;

  @Column()
  director: string;

  @Column({
    type: 'text',
    transformer: {
      to(value: string[]): string {
        return value.join();
      },
      from(value: string): string[] {
        return value.split(',');
      },
    },
  })
  tags: string[];

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  cover: string;

  @OneToMany(() => Schedules, (schedule) => schedule.film)
  schedule: Schedules[];
}
