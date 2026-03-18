import { Report } from "../../report/entities/report.entity";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]

    @Column({ default: true })
    admin: boolean

    @AfterInsert()
    logInsert() {
        console.log('Insert received with id', this.id);

    }

    @AfterUpdate()
    logUpdate() {
        console.log('Update completed on id ', this.id);

    }

    @AfterRemove()
    logRemove() {
        console.log('Removed data with id', this.id);

    }
}