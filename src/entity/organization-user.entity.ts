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
	OneToMany,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { OrganizationRole } from './organization-role.entity';
import { Organization } from './organization.entity';
import { Property } from './property.entity';


@Entity({ schema: 'poo' })
export class OrganizationUser {

	@PrimaryGeneratedColumn('uuid')
	organizationUserUuid?: string;


	@Index()
	@Generated('increment')
	@Column({ unique: true })
	organizationUserId?: number;


	@Index()
	@Column({ unique: true })
	firebaseId: string;


	@Column({ default: true })
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
	organization?: Organization;

	@DeleteDateColumn()
	deletedDate?: Date;

	@CreateDateColumn()
	createdDate?: Date;

	@UpdateDateColumn()
	updatedDate?: Date;

	@OneToMany(() => Property, (property) => property.manager)
	propertiesManaged?: Property[]

	@OneToMany(() => Property, (property) => property.owner)
	propertiesOwned?: Property[]
}
