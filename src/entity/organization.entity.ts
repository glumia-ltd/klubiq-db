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
	JoinColumn,
	OneToOne,
} from 'typeorm';
import { OrganizationUser } from './organization-user.entity';
import { Transaction } from './transaction.entity';
import { Property } from './property.entity';
import { OrganizationSettings } from './organization-settings.entity';
import { OrganizationSubscriptions } from './organization-subscriptions.entity';

@Entity({ schema: 'poo' })
export class Organization {

	@PrimaryGeneratedColumn('uuid')
	organizationUuid?: string;


	@Index('idx_organization_id')
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
	@Index('idx_deleted_date')
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

	@OneToMany(() => Property, (property) => property.organization)
	properties?: Property[];

	@OneToMany(() => Transaction, (transaction) => transaction.organization)
	transactions?: Transaction[];

	@OneToOne(() => OrganizationSettings, settings => settings.organization,
		{ cascade: ['insert', 'remove'], eager: true })
	settings: OrganizationSettings;

	@OneToMany(() => OrganizationSubscriptions, (subscription) => subscription.organization, {
		eager: true,
		cascade: ['insert', 'remove'],
	})
	subscriptions?: OrganizationSubscriptions[];

}
