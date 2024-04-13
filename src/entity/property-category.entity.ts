import {
	Entity,
	Column,
	OneToMany,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { AbstractEntity } from './abstract-entity';

@Entity({ schema: 'kdo' })
export class PropertyCategory extends AbstractEntity {

	@Column({ length: 255, unique: true })
	name: string;

	@Column({ length: 255, unique: true })
	displayText: string;


}
