import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	OneToOne,
	CreateDateColumn,
	ManyToMany,
	UpdateDateColumn,
	Index,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { Lease } from './lease.entity';

@Entity({ schema: 'kdo' })
export class TenantUser {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id?: number;

	@Column({ type: 'varchar', length: 50, nullable: true })
	title?: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	firstName?: string;


	@Index()
	@Column({ unique: true })
	email: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	lastName?: string;

	@Column({ type: 'varchar', length: 255, unique: true, nullable: true })
	companyName?: string;

	@Column({ type: 'text', nullable: true })
	notes?: string;

	@OneToOne(() => UserProfile, { cascade: ['remove', 'update'] })
	@JoinColumn({
		name: 'profileUuid',
		referencedColumnName: 'profileUuid',
	})
	profile?: UserProfile;

	@ManyToMany(() => Lease, (lease) => lease.tenants)
	leases?: Lease[];

	@CreateDateColumn()
	createdDate?: Date;

	@UpdateDateColumn()
	updatedDate?: Date;

	@Column({ default: true })
	isActive?: boolean;

	@Column({ nullable: true })
	dateOfBirth?: Date;

}
