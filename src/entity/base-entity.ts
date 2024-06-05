import {
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract-entity';

export abstract class BaseEntity extends AbstractEntity {
    @CreateDateColumn({ select: false })
    createdDate?: Date;

    @UpdateDateColumn({ select: false })
    updatedDate?: Date;
}

