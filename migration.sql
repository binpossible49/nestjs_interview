Drop table if exists buildings cascade ;
CREATE TABLE "buildings" (
  "building_id" serial primary key ,
  "building_name" varchar(64),
  "building_code" varchar(64) not null
);
Drop table if exists levels cascade ;
CREATE TABLE "levels" (
  "level_id" serial primary key ,
  "building_id" integer not null,
  "level_name" varchar(64),
  "level_code" varchar(64) not null
);

Drop table if exists locations;
CREATE TABLE "locations" (
  "location_id" serial primary key ,
  "parent_location_id" integer ,
  "level_id" serial,
  "location_name" varchar(64),
  "location_code"  varchar(64),
  "area" decimal(10,2) not null
);

ALTER TABLE "levels" ADD FOREIGN KEY ("building_id") REFERENCES "buildings" ("building_id") ON DELETE CASCADE;
ALTER TABLE "locations" ADD FOREIGN KEY ("level_id") REFERENCES "levels" ("level_id") ON DELETE CASCADE;
alter table buildings add constraint tb_buildings_code_uidx unique (building_code);
alter table levels add constraint tb_levels_buildings_code_uidx unique (building_id,level_code);
alter table locations add constraint tb_locations_code_uidx unique (level_id,parent_location_id,location_code);
aLTER TABLE "locations" ADD FOREIGN KEY ("parent_location_id") REFERENCES "locations" ("location_id") ON DELETE CASCADE;
