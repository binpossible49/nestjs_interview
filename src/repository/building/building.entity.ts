import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('buildings')
export class Building {
  @PrimaryGeneratedColumn({ name: 'building_id' })
  buildingID: number;

  @Column({ name: 'building_name' })
  buildingName: string;

  @Column({ name: 'building_code' })
  buildingCode: string;
}
