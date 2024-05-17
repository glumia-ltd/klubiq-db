import { Entity, Column, ManyToMany, Index } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { Property } from './property.entity';

@Entity({ schema: 'kdo' })
export class Amenity extends AbstractEntity {

    @Index()
    @Column({ length: 50, unique: true })
    name: string;

    @ManyToMany(() => Property, (property) => property.amenities)
    properties?: Property[];
}
