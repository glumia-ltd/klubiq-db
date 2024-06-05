import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Lease } from './lease.entity';
import { TransactionType } from '../types/enums';

@Entity({ schema: 'poo' })
export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    uuid?: string;


    @Index()
    @Column({ unique: true })
    code: string;


    @Column({ type: 'timestamp' })
    transactionDate?: Date;


    @Column({ type: 'money' })
    amount: number;


    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @CreateDateColumn({ select: false })
    createdDate?: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;


    @Index()
    @ManyToOne(() => Lease, (lease) => lease.transactions)
    @JoinColumn({ name: 'leaseId', referencedColumnName: 'id' })
    lease?: Lease;
}
