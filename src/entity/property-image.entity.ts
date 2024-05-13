import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { Property } from './property.entity';

@Entity({ schema: 'kdo' })
export class PropertyImage extends AbstractEntity {
    @Column()
    url: string;

    @ManyToOne(() => Property, (property) => property.images)
    property?: Property;
}
