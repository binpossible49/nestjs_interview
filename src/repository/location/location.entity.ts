import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn({ name: 'location_id' })
  locationID: number;

  @Column({ name: 'parent_location_id', nullable: true })
  parentLocationID?: number;

  @Column({ name: 'level_id' })
  levelID: number;

  @Column({ name: 'location_name' })
  locationName: string;

  @Column({ name: 'location_code' })
  locationCode: string;

  @Column({ name: 'area' })
  area: number;
}
