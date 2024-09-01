import {
	Entity,
	PrimaryGeneratedColumn,
	DeleteDateColumn,
	Column,
	OneToOne,
	Generated,
	JoinColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	Index,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { OrganizationRole } from './organization-role.entity';
import { Organization } from './organization.entity';


@Entity({ schema: 'poo' })
export class OrganizationUser {

	@PrimaryGeneratedColumn('uuid')
	organizationUserUuid?: string;


	@Index('IDX_ORG_USER_ID')
	@Generated('increment')
	@Column({ unique: true })
	organizationUserId?: number;


	@Index('IDX_ORG_USER_FIREBASE_ID')
	@Column({ unique: true })
	firebaseId: string;


	@Column({ default: true })
	@Index('IDX_ORG_USER_ACTIVE')
	isActive?: boolean;


	@Column({ length: 100 })
	firstName: string;


	@Column({ length: 100 })
	lastName: string;

	@Column({ default: false })
	isDeleted?: boolean;


	@Column({ default: false })
	isAccountVerified?: boolean;

	@OneToOne(() => UserProfile)
	@JoinColumn({
		name: 'profileUuid',
		referencedColumnName: 'profileUuid',
	})
	@Index('IDX_PROFILE_ORG_USER')
	profile?: UserProfile;

	@ManyToOne(() => OrganizationRole, { eager: true })
	@JoinColumn({
		name: 'roleId',
		referencedColumnName: 'id',
	})
	orgRole?: OrganizationRole;

	@ManyToOne(() => Organization, { eager: true })
	@JoinColumn({
		name: 'organizationUuid',
		referencedColumnName: 'organizationUuid',
	})
	@Index('IDX_ORG_USER_ORGANIZATION')
	organization?: Organization;

	@DeleteDateColumn()
	deletedDate?: Date;

	@CreateDateColumn()
	createdDate?: Date;

	@UpdateDateColumn()
	updatedDate?: Date;
}
