import { OrganizationUser } from './organization-user.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToMany,
	JoinTable,
} from 'typeorm';

import { FeaturePermission } from './feature-permission.entity';

@Entity({ schema: 'poo' })
export class OrganizationRole {
	@PrimaryGeneratedColumn()
	id?: number;


	@Column({ length: 255, unique: true })
	name: string;

	@Column({ length: 50, nullable: true })
	alias?: string;

	@Column({ type: 'text', nullable: true })
	description?: string;

	@OneToMany(() => OrganizationUser, (orgUser) => orgUser.orgRole)
	users?: OrganizationUser[];

	@ManyToMany(
		() => FeaturePermission,
		(featurePermission) => featurePermission.organizationRoles,
	)
	@JoinTable({
		name: 'role_feature_permissions',
		joinColumn: {
			name: 'roleId',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'featurePermissionId',
			referencedColumnName: 'featurePermissionId',
		},
	})
	featurePermissions: FeaturePermission[];
}
