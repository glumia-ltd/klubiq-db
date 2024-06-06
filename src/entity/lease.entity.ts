
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
import { PaymentFrequency } from '../types/enums';
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


    @Column({ nullable: true })
    customPaymentFrequency?: number;


    @Column({ type: 'date' })
    startDate?: Date;


    @Column({ type: 'date' })
    endDate?: Date;


    @Column({ type: 'date', nullable: true })
    rentDueDate?: Date;


    @Column({ type: 'money' })
    rentAmount: number;


    @Column({ type: 'money', nullable: true })
    securityDeposit: number;



    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;


    @Column({ default: false })
    isDraft?: boolean;

    @ManyToMany(() => UserProfile, (user) => user.leases)
    @JoinTable({
        name: 'tenants_leases',
        joinColumn: {
            name: 'leaseId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tenantUid',
            referencedColumnName: 'firebaseId',
        },
    })
    tenants?: UserProfile[];

    @Index()
    @ManyToOne(() => Property, (property) => property.leases)
    @JoinColumn({ name: 'propertyUuId', referencedColumnName: 'uuid' })
    property?: Property;

    @OneToMany(() => Transaction, (transaction) => transaction.lease)
    transactions?: Transaction[];
}
