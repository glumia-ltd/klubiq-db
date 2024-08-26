import { Entity, Column, ManyToOne, Index, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { Property } from './property.entity';
import { Unit } from './unit.entity';

@Entity({ schema: 'kdo' })
export class PropertyImage extends AbstractEntity {

    @Column()
    url: string;


    @Column({
        type: 'timestamptz',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    uploadDate?: Date;


    @Column({ type: 'decimal', nullable: true })
    fileSize?: number;


    @Column({ default: false })
    isMain?: boolean;

    @ManyToOne(() => Property, (property) => property.images, { onDelete: 'CASCADE' })
    @Index('IDX_PROPERTY_IMAGES_PROPERTY_ID')
    property?: Property;

    @ManyToOne(() => Unit, unit => unit.images, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'unitId' })
    @Index('IDX_PROPERTY_IMAGES_UNIT_ID')
    unit: Unit;
}

