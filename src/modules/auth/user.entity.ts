
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../tasks/task.entity";
import { Exclude } from "class-transformer";


@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    fullname:string

    @Column({unique:true})
    username:string

    @Column({unique:true})
    phone:string

    @Column({unique:true})
    email:string

    @Column()
    @Exclude({toPlainOnly:true})
    password:string

    @OneToMany(type=>Task,task=>task.user,{eager:true})
    tasks:Task[]

    @Column()
    verified:boolean

}