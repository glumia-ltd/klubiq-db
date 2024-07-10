import {
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract-entity';

export abstract class BaseEntity extends AbstractEntity {
    @CreateDateColumn()
    createdDate?: Date;

    @UpdateDateColumn()
    updatedDate?: Date;
}

