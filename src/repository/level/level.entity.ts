import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('levels')
export class Level {
  @PrimaryGeneratedColumn({ name: 'level_id' })
  levelID: number;

  @Column({ name: 'building_id' })
  buildingID: number;

  @Column({ name: 'level_name' })
  levelName: string;

  @Column({ name: 'level_code' })
  levelCode: string;
}
