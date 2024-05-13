import { Entity, Column, ManyToMany } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { Property } from './property.entity';

@Entity({ schema: 'kdo' })
export class PropertyAmenity extends AbstractEntity {
    @Column({ length: 255, unique: true })
    name: string;

    @ManyToMany(() => Property, (property) => property.amenities)
    properties?: Property[];
}
