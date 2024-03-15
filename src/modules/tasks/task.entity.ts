import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./interfaces/task/task.interface";
import { User } from "../auth/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    status:TaskStatus

    @ManyToOne(type=>User,user=>user.tasks,{eager:false})
    user:User

}
