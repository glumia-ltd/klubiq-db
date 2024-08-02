import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { Property } from './property.entity';

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

    @ManyToOne(() => Property, (property) => property.images)
    property?: Property;
}
