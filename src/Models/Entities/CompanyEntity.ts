import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from './UserEntity';

@Entity()
export class Company extends GenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    public userId: User;

    @Column({ nullable: true, length: 255 })
    public name: string;

    @Column({ nullable: true, length: 255 })
    public description: string;

    @Column({ type: 'timestamp', nullable: true, name: 'registration_date' })
    public registrationDate: Date;

    @Column({ default: 1500, nullable: true })
    public balance: number;

    @Column({ default: false })
    public active: boolean;

    public getUserId(): User {
        return this.userId;
    }

    public setUserId(userId: User): void {
        this.userId = userId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getRegistrationDate(): Date {
        return this.registrationDate;
    }

    public setRegistrationDate(registrationDate: Date): void {
        this.registrationDate = registrationDate;
    }

    public getBalance(): number {
        return this.balance;
    }

    public setBalance(balance: number): void {
        this.balance = balance;
    }

    public isActive(): boolean {
        return this.active;
    }

    public setActive(active: boolean): void {
        this.active = active;
    }

}