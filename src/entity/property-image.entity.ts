import { Entity, Column, ManyToOne, Index, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { Property } from './property.entity';
import { Unit } from './unit.entity';
import { Organization } from './organization.entity';

@Entity({ schema: 'kdo' })
export class PropertyImage extends AbstractEntity {

    @Column()
    url: string;


    @Column({
        type: 'timestamptz',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    uploadDate?: Date;


    @Column({ type: 'decimal', nullable: false, default: 0 })
    fileSize?: number;


    @Column({ default: false })
    isMain?: boolean;

    @Column({ type: 'varchar', nullable: true })
    externalId?: string;

    @Column({ type: 'varchar', nullable: true })
    fileName?: string;

    @ManyToOne(() => Property, (property) => property.images,
        //{ onDelete: 'SET NULL' }
    )
    @Index('IDX_PROPERTY_IMAGES_PROPERTY_ID')
    property?: Property;

    @ManyToOne(() => Unit, unit => unit.images, {
        //onDelete: 'SET NULL', 
        nullable: true
    })
    @JoinColumn({ name: 'unitId' })
    @Index('IDX_PROPERTY_IMAGES_UNIT_ID')
    unit?: Unit;

    @ManyToOne(
        () => Organization,
        (organization) => organization.propertyImages,
        // {
        //     onDelete: 'SET NULL',
        // },
    )
    @JoinColumn({ name: 'organizationUuid' })
    @Index('IDX_ORGANIZATION_IMAGES_ORGANIZATION_ID')
    organization: Organization;

    @Column({ default: false })
    isArchived?: boolean;
}

