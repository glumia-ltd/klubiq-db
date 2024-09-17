import { PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index, Entity, JoinColumn } from "typeorm";
import { SubscriptionPlan } from "./subscription-plan.entity";
import { Organization } from "./organization.entity";

@Entity({ schema: 'poo' })
export class OrganizationSubscriptions {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    @Index('idx_organization_uuid')
    organizationUuid: string;

    @Column()
    subscription_plan_id: number;

    @CreateDateColumn({ type: 'timestamp without time zone' })
    start_date: Date;

    @Column({ type: 'timestamp without time zone' })
    end_date: Date;

    @Column()
    duration: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    auto_renew: boolean;

    @Column()
    is_active: boolean;

    @Column({ default: 'pending' })
    payment_status: string;

    @Column()
    is_free_trial: boolean;


    @ManyToOne(() => Organization, (organization) => organization.subscriptions)
    @JoinColumn({ name: 'organizationUuid' })
    organization?: Organization;


    @ManyToOne(() => SubscriptionPlan, (subscriptionPlan) => subscriptionPlan.organizations)
    @JoinColumn({ name: 'subscription_plan_id' })
    subscription_plan?: SubscriptionPlan;

}
