import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { Rol } from "./RolEntity";

@Entity()
export class User extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true, length: 255 })
    public email: string;

    @Column({ nullable: false, length: 255 })
    public password: string;

    @ManyToOne(() => Rol, (rol) => rol.id)
    @JoinColumn({ name: 'rol_id' })
    public rol: Rol;

    @Column({ nullable: false, length: 255 })
    public uuid: string;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getRol(): Rol {
        return this.rol;
    }

    public setRol(rol: Rol): void {
        this.rol = rol;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

}