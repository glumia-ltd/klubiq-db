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

	@CreateDateColumn({ select: false })
	createdDate?: Date;

	@UpdateDateColumn({ select: false })
	updatedDate?: Date;

	@Column({ length: 100, nullable: true })
	unit?: string;

	@Column({ length: 100 })
	addressLine1: string;

	@Column({ length: 100, nullable: true })
	addressLine2: string;

	@Column({ length: 50, nullable: true })
	city: string;

	@Column({ length: 50, nullable: true })
	state: string;

	@Column({ length: 50, nullable: true })
	postalCode: string;

	@Column({ length: 50 })
	country: string;

	@Column({ default: false })
	isManualAddress: boolean;

	@Column({ type: 'decimal', nullable: true })
	latitude: number;

	@Column({ type: 'decimal', nullable: true })
	longitude: number;

	@DeleteDateColumn({ select: false })
	deletedDate?: Date;

}
