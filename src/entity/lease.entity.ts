
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { BaseEntity } from './base-entity';
import { Property } from './property.entity';
import { Transaction } from './transaction.entity';
import { LeaseStatus, PaymentFrequency } from '../types/enums';
import { TenantUser } from './tenant.entity';
@Entity({ schema: 'poo' })
export class Lease extends BaseEntity {


    @Index()
    @Column({ length: 255, unique: true })
    name: string;


    @Column({
        type: 'enum',
        enum: PaymentFrequency,
        default: PaymentFrequency.ANNUALLY,
    })
    paymentFrequency: PaymentFrequency;

    @Column({
        type: 'enum',
        enum: LeaseStatus,
        default: LeaseStatus.NEW,
    })
    status: LeaseStatus;


    @Column({ default: 0 })
    customPaymentFrequency?: number;


    @Column({ type: 'date' })
    startDate?: Date;


    @Column({ type: 'date' })
    endDate?: Date;

    @Column({ type: 'int', nullable: false })
    rentDueDay?: number;


    @Column({ type: 'decimal', precision: 18, scale: 2 })
    rentAmount: number;


    @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
    securityDeposit?: number;

    @Column({ default: false })
    isArchived?: boolean;


    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;


    @Column({ default: false })
    isDraft?: boolean;

    @ManyToMany(() => TenantUser, (user) => user.leases)
    @JoinTable({
        name: 'leases_tenants',
        joinColumn: {
            name: 'leaseId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tenantId',
            referencedColumnName: 'id',
        },

    })
    tenants?: TenantUser[];

    @Index()
    @ManyToOne(() => Property, (property) => property.leases)
    @JoinColumn({ name: 'propertyUuId', referencedColumnName: 'uuid' })
    property?: Property;

    @OneToMany(() => Transaction, (transaction) => transaction.lease)
    transactions?: Transaction[];
}
