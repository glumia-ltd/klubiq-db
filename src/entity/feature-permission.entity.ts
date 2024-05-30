import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	ManyToMany,
} from 'typeorm';

import { Feature } from './feature.entity';
import { Permission } from './permission.entity';
import { OrganizationRole } from './organization-role.entity';

@Entity({ schema: 'poo' })
export class FeaturePermission {
	@PrimaryGeneratedColumn()
	featurePermissionId?: number;

	@Column()
	permissionId: number;

	@Column()
	featureId: number;

	@Column({ length: 255, unique: true })
	alias?: string;

	@Column({ type: 'text', nullable: true })
	description?: string;

	@ManyToOne(() => Permission, (permission) => permission.featurePermissions)
	permission?: Permission;

	@ManyToOne(() => Feature, (feature) => feature.featurePermissions)
	feature?: Feature;

	@ManyToMany(
		() => OrganizationRole,
		(organizationRole) => organizationRole.featurePermissions,
	)
	organizationRoles: OrganizationRole[];
}
