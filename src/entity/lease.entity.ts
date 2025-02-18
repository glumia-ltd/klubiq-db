
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Generated,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { BaseEntity } from './base-entity';
import { Property } from './property.entity';
import { Transaction } from './transaction.entity';
import { LeaseStatus, PaymentFrequency } from '../types/enums';
import { TenantUser } from './tenant.entity';
import { Unit } from './unit.entity';

@Entity({ schema: 'poo' })
@Index('idx_lease_dates_status', ['startDate', 'endDate', 'status'])
@Index('idx_lease_dates', ['startDate', 'endDate'])
@Index('idx_lease_start_last_payment_freq', ['startDate', 'lastPaymentDate', 'paymentFrequency'])
export class Lease {
    @PrimaryGeneratedColumn()
    id?: number;

    @Generated('uuid')
    @Column({ unique: true })
    @Index('idx_lease_uuid')
    uuid?: string;

    @Index()
    @Column({ length: 255, unique: true, nullable: false })
    name?: string;

    @Column({
        type: 'enum',
        enum: PaymentFrequency,
        default: PaymentFrequency.ANNUALLY,
    })
    @Index('idx_lease_payment_frequency')
    paymentFrequency: PaymentFrequency;

    @Column({
        type: 'enum',
        enum: LeaseStatus,
        default: LeaseStatus.INACTIVE,
    })
    @Index('idx_lease_status')
    status?: LeaseStatus;

    @Column({ default: 0 })
    @Index('idx_lease_custom_payment_frequency')
    customPaymentFrequency?: number;

    @Column({ type: 'date', nullable: true })
    @Index('idx_lease_last_payment_date')
    lastPaymentDate?: Date;

    @Column({ type: 'date', nullable: true })
    @Index('idx_lease_next_due_date')
    nextDueDate?: Date;

    @Column({ type: 'date' })
    @Index('idx_lease_start_date')
    startDate?: Date;


    @Column({ type: 'date', nullable: true })
    @Index('idx_lease_end_date')
    endDate?: Date;


    @Column({ type: 'int', nullable: true })
    @Index('idx_lease_rent_due_day')
    rentDueDay?: number;


    @Column({ type: 'decimal', precision: 18, scale: 2, nullable: false })
    rentAmount?: number;


    @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
    securityDeposit?: number;

    @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
    lateFeeAmount?: number;

    @CreateDateColumn()
    createdDate?: Date;

    @UpdateDateColumn()
    updatedDate?: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;


    @Column({ default: false })
    isDraft?: boolean;


    @Column({ default: false })
    isArchived?: boolean;

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

    @Index('IDX_UNIT_UUID')
    @ManyToOne(() => Unit, (unit) => unit.leases, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'unitId' })
    unit: Unit;

    @OneToMany(() => Transaction, (transaction) => transaction.lease)
    transactions?: Transaction[];

    @Index('IDX_LEASE_ORGANIZATION_UUID')
    @Column({ type: 'uuid', nullable: true })
    organizationUuid?: string;
}
