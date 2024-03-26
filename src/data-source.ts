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
        UserProfile],
    migrations: ['build/migrations/*.js'],
    subscribers: [],
})
// entities: ["src/entity/*.entity.ts"],
//     migrations: [],
