import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { Property } from './property.entity';
import { UnitStatus } from '../types/enums';
import { Lease } from './lease.entity';
import { PropertyImage } from './property-image.entity';

@Entity({ schema: 'poo' })
export class Unit {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'varchar', length: 50 })
    unitNumber: string;

    @Column({ type: 'int', nullable: true })
    floor: number;

    @Column({ type: 'int', nullable: true })
    rooms: number;

    @Column({ type: 'int', nullable: true })
    offices: number;

    @Column({ type: 'int', nullable: true })
    bedrooms: number;

    @Column({ type: 'int', nullable: true })
    bathrooms: number;

    @Column({ type: 'int', nullable: true })
    toilets: number;

    @Column({ type: 'json', nullable: true })
    area: { value: number; unit: string };

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    rentAmount?: number;

    @Column({
        type: 'enum',
        enum: UnitStatus,
        default: UnitStatus.VACANT,
    })
    status: UnitStatus;


    @ManyToOne(() => Property, property => property.units, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'propertyUuid' })
    @Index('IDX_PROPERTY_UUID', ['propertyUuid'])
    property: Property;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Lease, (lease) => lease.unit)
    leases?: Lease[];

    @OneToMany(() => PropertyImage, image => image.unit, { cascade: true })
    images: PropertyImage[];

    @Column({ type: 'simple-array', nullable: true })
    amenities?: string[];
}
