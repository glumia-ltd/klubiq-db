
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Generated,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
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
import { Amenity } from './property-amenity.entity';
import { PropertyImage } from './property-image.entity';
import { UserProfile } from './user-profile.entity';
import { Lease } from './lease.entity';
import { Maintenance } from './maintenance.entity';

@Entity({ schema: 'poo' })
@Tree('closure-table', {
	closureTableName: 'property_unit',
})
export class Property {

	@PrimaryGeneratedColumn('uuid')
	uuid?: string;


	@Index()
	@Generated('increment')
	@Column({ unique: true })
	id?: number;


	@Index()
	@Column({ length: 100 })
	name: string;


	@Column({ type: 'text', nullable: true })
	description?: string;


	@Column({ type: 'text', nullable: true })
	note?: string;


	@Column({ type: 'simple-array', nullable: true })
	tags?: string[];


	@Column({ default: false })
	isMultiUnit?: boolean;


	@Column({ type: 'decimal', nullable: true })
	bedroom?: number;


	@Column({ type: 'decimal', nullable: true })
	bathroom?: number;


	@Column({ type: 'decimal', nullable: true })
	toilet?: number;


	@Column({ type: 'json', nullable: true })
	area?: { value: number; unit: string };

	@DeleteDateColumn({ select: false })
	deletedDate?: Date;


	@Column({ default: false })
	isArchived?: boolean;


	@Column({ nullable: true, select: false })
	archivedDate?: Date;

	@CreateDateColumn()
	createdDate?: Date;

	@UpdateDateColumn()
	updatedDate?: Date;

	@ManyToOne(() => PropertyCategory, { eager: true })
	@JoinColumn({
		name: 'categoryId',
		referencedColumnName: 'id',
	})
	category?: PropertyCategory;

	@ManyToOne(() => PropertyType, { eager: true })
	@JoinColumn({
		name: 'typeId',
		referencedColumnName: 'id',
	})
	type?: PropertyType;

	@ManyToOne(() => PropertyPurpose, { eager: true })
	@JoinColumn({
		name: 'purposeId',
		referencedColumnName: 'id',
	})
	purpose?: PropertyPurpose;


	@ManyToOne(() => PropertyStatus, { eager: true })
	@JoinColumn({
		name: 'statusId',
		referencedColumnName: 'id',
	})
	status?: PropertyStatus;

	@OneToOne(() => PropertyAddress, { eager: true, cascade: ['insert'], nullable: true })
	@JoinColumn()
	address?: PropertyAddress;

	@ManyToOne(() => Organization, { eager: true })
	@JoinColumn({
		name: 'organizationUuid',
		referencedColumnName: 'organizationUuid',
	})
	organization?: Organization;

	@TreeParent()
	parentProperty?: Property;

	@TreeChildren({ cascade: true })
	units?: Property[];

	@ManyToMany(() => Amenity, (amenity) => amenity.properties, {
		cascade: ['insert'],
	})
	@JoinTable({
		name: 'properties_amenities',
		joinColumn: {
			name: 'propertyUuid',
			referencedColumnName: 'uuid',
		},
		inverseJoinColumn: {
			name: 'amenityId',
			referencedColumnName: 'id',
		},
	})
	amenities?: Amenity[];


	@Column({ default: false })
	isDraft: boolean;

	@OneToMany(() => PropertyImage, (image) => image.property, {
		cascade: true
	})
	images?: PropertyImage[]

	@ManyToOne(() => UserProfile, (user) => user.propertiesOwned)
	@JoinColumn({ name: 'ownerUid', referencedColumnName: 'firebaseId' })
	owner?: UserProfile;

	@ManyToOne(() => UserProfile, (user) => user.propertiesManaged)
	@JoinColumn({ name: 'managerUid', referencedColumnName: 'firebaseId' })
	manager?: UserProfile;

	@Column({ default: false })
	isListingPublished?: boolean;

	@OneToMany(() => Lease, (lease) => lease.property)
	leases?: Lease[];

	@OneToMany(() => Maintenance, (maintenance) => maintenance.property)
	maintenances?: Maintenance[];

	@Column({ default: 1 })
	unitCount?: number;
}
