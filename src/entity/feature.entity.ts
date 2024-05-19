import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
} from 'typeorm';
import { FeaturePermission } from './feature-permission.entity';

@Entity({ schema: 'poo' })
export class Feature {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ length: 255, unique: true })
	name: string;

	@Column()
	alias: string;

	@Column({ type: 'text', nullable: true })
	description?: string;

	@OneToMany(
		() => FeaturePermission,
		(featurePermission) => featurePermission.feature,
	)
	featurePermissions: FeaturePermission[];
}
