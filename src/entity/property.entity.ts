
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Generated,
	Index,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	Tree,
	TreeChildren,
	TreeParent,
	UpdateDateColumn,
} from 'typeorm';
import { PropertyAddress } from './property-address.entity';
import { PropertyCategory } from './property-category.entity';
import { PropertyType } from './property-type.entity';
import { Organization } from './organization.entity';
import { PropertyPurpose } from './property-purpose.entity';
import { PropertyStatus } from './property-status.entity';

@Entity({ schema: 'poo' })
@Tree("closure-table", {
	closureTableName: 'property_unit'
})
export class Property {
	@PrimaryGeneratedColumn('uuid')
	uuid?: string;

	@Index()
	@Generated('increment')
	@Column({ unique: true })
	id?: number;

	@Column({ length: 100 })
	name: string;

	@Column({ type: 'text', nullable: true })
	descritption?: string;

	@Column({ type: 'text', nullable: true })
	note?: string;

	@Column({ type: 'simple-array' })
	tags: string[];

	@Column()
	isMultiUnit: boolean;

	@Column({ type: 'decimal', precision: 3, scale: 1 })
	bedrooms: number;

	@Column({ type: 'decimal', precision: 3, scale: 1 })
	bathrooms: number;

	@Column({ type: 'json' })
	area: { value: number, unit: string };

	@DeleteDateColumn()
	deletedDate?: Date;

	@Column({ default: false })
	isArchived?: boolean;

	@Column()
	aechivedDate?: Date;

	@CreateDateColumn()
	createdDate?: Date;

	@UpdateDateColumn()
	updatedDate?: Date;

	@ManyToOne(() => PropertyCategory, { eager: true })
	@JoinColumn({
		name: 'categoryId',
		referencedColumnName: 'id',
	})
	category: PropertyCategory;


	@ManyToOne(() => PropertyType, { eager: true })
	@JoinColumn({
		name: 'typeId',
		referencedColumnName: 'id',
	})
	type: PropertyType;


	@ManyToOne(() => PropertyPurpose, { eager: true })
	@JoinColumn({
		name: 'purposeId',
		referencedColumnName: 'id',
	})
	purpose: PropertyPurpose;

	@ManyToOne(() => PropertyStatus, { eager: true })
	@JoinColumn({
		name: 'statusId',
		referencedColumnName: 'id',
	})
	status: PropertyStatus;

	@OneToOne(
		() => PropertyAddress,
		{ eager: true, cascade: true }
	)
	@JoinColumn()
	address: PropertyAddress;

	@ManyToOne(() => Organization, { eager: true })
	@JoinColumn({
		name: 'organizationUuid',
		referencedColumnName: 'organizationUuid',
	})
	organization: Organization;

	@TreeParent()
	parentProperty: Property;

	@TreeChildren()
	units: Property[];
}
