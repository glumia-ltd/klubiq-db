import {
	Entity,
	Column,
} from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity({ schema: 'kdo' })
export class PropertyType extends AbstractEntity {

	@Column({ length: 255, unique: true })
	name: string;

	@Column({ length: 255, unique: true })
	displayText: string;

}
