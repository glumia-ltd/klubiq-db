import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToOne,
	Generated,
	JoinColumn,
	Index,
	OneToMany,
	ManyToMany,
} from 'typeorm';
import { Role } from './role.entity';
import { OrganizationUser } from './organization-user.entity';
import { Property } from './property.entity';
import { TenantUser } from './tenant.entity';
import { UserPreferences } from './user-preferences.entity';
import { NotificationSubscription } from './notification-subscription.entity';

@Entity({ schema: 'kdo' })
export class UserProfile {

	@PrimaryGeneratedColumn('uuid')
	profileUuid?: string;


	@Index('IDX_PROFILE_ID')
	@Generated('increment')
	@Column({ unique: true })
	profileId?: number;

	@Column({ length: 100, nullable: true })
	firstName?: string;

	@Column({ length: 100, nullable: true })
	lastName?: string;


	@Index()
	@Column({ unique: true })
	@Index('IDX_FIREBASE_ID')
	firebaseId: string;


	@Index('IDX_EMAIL')
	@Column({ unique: true })
	email: string;


	@Column({ nullable: true })
	profilePicUrl?: string;


	@Column({ nullable: true })
	phoneNumber?: string;


	@Column({ nullable: true })
	countryPhoneCode?: string;


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
	formOfIdentity?: string;


	@Column({ nullable: true })
	dateOfBirth?: Date;


	@Column({ nullable: true })
	gender?: string;


	@Column({ type: 'text', nullable: true })
	bio?: string;


	@Column({ default: false })
	isTermsAndConditionAccepted?: boolean;


	@Column({ default: false })
	isPrivacyPolicyAgreed?: boolean;

	@ManyToOne(() => Role, { eager: true })
	@JoinColumn({
		name: 'roleId',
		referencedColumnName: 'id',
	})
	systemRole?: Role;

	@OneToOne(
		() => OrganizationUser,
		(organizationUser) => organizationUser.profile,
		{ eager: true },
	)
	organizationUser?: OrganizationUser;

	@OneToMany(() => Property, (property) => property.manager)
	propertiesManaged?: Property[];

	@OneToMany(() => Property, (property) => property.owner)
	propertiesOwned?: Property[];

	@CreateDateColumn()
	createdDate?: Date;

	@UpdateDateColumn()
	updatedDate?: Date;

	@OneToOne(
		() => TenantUser,
		(tenantUser) => tenantUser.profile,
		{ eager: true },
	)
	tenantUser?: TenantUser;

	@OneToOne(() => UserPreferences, (preferences) => preferences.profile, { eager: true, cascade: ['insert', 'remove'] })
	preferences: UserPreferences;

	@OneToOne(() => NotificationSubscription, (subscription) => subscription.user, {
		eager: true,
		cascade: ['insert', 'remove'],
	})
	notificationSubscription?: NotificationSubscription;
}
