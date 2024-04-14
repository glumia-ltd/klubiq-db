import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'poo' })
export class PropertyAddress {

	@PrimaryGeneratedColumn()
	public id: number;

	@CreateDateColumn()
	createdDate?: Date;

	@UpdateDateColumn()
	updatedDate?: Date;


	@Column({ length: 100 })
	addressLine1: string;

	@Column({ length: 100, default: '' })
	addressLine2: string;

	@Column({ length: 50 })
	city: string;

	@Column({ length: 50 })
	state: string;

	@Column({ length: 20 })
	postalCode: string;

	@Column({ length: 50 })
	country: string;

	@Column()
	isManualAddress: boolean;

	@Column({ type: 'decimal' })
	latitude: number;

	@Column({ type: 'decimal' })
	longitude: number;

	@DeleteDateColumn()
	deletedDate?: Date;

}
