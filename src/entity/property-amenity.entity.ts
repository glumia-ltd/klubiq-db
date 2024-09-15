import { Entity, Column, Index } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity({ schema: 'kdo' })
export class Amenity extends AbstractEntity {

    @Index()
    @Column({ length: 50, unique: true })
    name: string;

    @Column({ default: true })
    isPrivate: boolean;
}
