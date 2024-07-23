import {
	Entity,
	PrimaryGeneratedColumn,
	DeleteDateColumn,
	Column,
	Generated,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	Index,
} from 'typeorm';
import { OrganizationUser } from './organization-user.entity';
import { Transaction } from './transaction.entity';
import { Property } from './property.entity';

@Entity({ schema: 'poo' })
export class Organization {

	@PrimaryGeneratedColumn('uuid')
	organizationUuid?: string;


	@Index()
	@Generated('increment')
	@Column({ unique: true })
	organizationId?: number;


	@Column({ default: true })
	isActive?: boolean;

	@Column({ default: false })
	isVerified?: boolean;

	@Column({ nullable: true })
	email?: string;

	@Column({ nullable: true })
	govRegistrationNumber?: string;

	@Column({ nullable: true })
	countryPhoneCode?: string;

	@Column({ nullable: true })
	phoneNumber?: string;

	@Index()
	@Column({ length: 100, unique: true })
	name: string;

	@Column({ default: false })
	isDeleted?: boolean;

	@OneToMany(() => OrganizationUser, (orgUser) => orgUser.organization, {
		cascade: true,
	})
	users?: OrganizationUser[];

	@DeleteDateColumn()
	deletedDate?: Date;

	@CreateDateColumn()
	createdDate?: Date;

	@UpdateDateColumn()
	updatedDate?: Date;

	@Column({ nullable: true })
	street?: string;

	@Column({ nullable: true })
	addressLine2?: string;

	@Column({ nullable: true })
	state?: string;

	@Column({ nullable: true })
	city?: string;

	@Column({ nullable: true })
	country?: string;

	@Column({ nullable: true })
	postalCode?: string;

	@Column({ nullable: true })
	companyType?: string;

	@Column({ nullable: true })
	website?: string;

	@Column({ nullable: true })
	logoUrl?: string;

	@Column({ default: false })
	isRentDueEmailNotificationEnabled?: boolean;

	@Column({ default: false })
	isMaintenanceRequestNotificationEnabled?: boolean;

	@OneToMany(() => Property, (property) => property.organization)
	properties?: Property[];

	@OneToMany(() => Transaction, (transaction) => transaction.organization)
	transactions?: Transaction[];

}
