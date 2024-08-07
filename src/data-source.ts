import { Organization } from './entity/organization.entity';
import "reflect-metadata"
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { OrganizationRole } from './entity/organization-role.entity';
import { OrganizationUser } from './entity/organization-user.entity';
import { Feature } from './entity/feature.entity';
import { FeaturePermission } from './entity/feature-permission.entity';
import { Permission } from './entity/permission.entity';
import { Role } from './entity/role.entity';
import { UserProfile } from './entity/user-profile.entity';
import { PropertyAddress } from './entity/property-address.entity';
import { Property } from './entity/property.entity';
import { PropertyCategory } from './entity/property-category.entity';
import { PropertyPurpose } from './entity/property-purpose.entity';
import { PropertyStatus } from './entity/property-status.entity';
import { PropertyType } from './entity/property-type.entity';
import { Amenity } from './entity/property-amenity.entity';
import { PropertyImage } from './entity/property-image.entity';
import { Transaction } from './entity/transaction.entity';
import { Lease } from './entity/lease.entity';
import { Maintenance } from './entity/maintenance.entity';
import { UserInvitation } from './entity/user.invitation.entity';
import { TenantUser } from './entity/tenant.entity';
dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    ssl: {
        rejectUnauthorized: false,
    },
    logging: false,
    entities: [Organization,
        OrganizationRole,
        OrganizationUser,
        Feature,
        FeaturePermission,
        Permission,
        Role,
        UserProfile,
        PropertyAddress,
        Property,
        PropertyCategory,
        PropertyPurpose,
        PropertyStatus,
        PropertyType,
        Amenity,
        PropertyImage,
        Lease,
        Maintenance,
        Transaction,
        UserInvitation,
        TenantUser
    ],
    migrations: ['build/migrations/*-changes.js'],
    subscribers: [],
})
