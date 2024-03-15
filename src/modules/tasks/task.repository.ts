import { DataSource, EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./interfaces/task/task.interface";
import { Inject, NotFoundException } from "@nestjs/common";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { UpdateTaskStatus } from "./dto/update-status.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { User } from "../auth/user.entity";
import { LoggerService } from "src/logger/logger.service";




@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    constructor(private dataSource: DataSource,
        private loggerService:LoggerService) {
        super(Task, dataSource.createEntityManager());
    }

    async createTask(createTaskDto:CreateTaskDto,user:User):Promise<void>{
        const {title,description}=createTaskDto
        const task=this.create({
            title,
            description,
            status:TaskStatus.OPEN,
            user: user, // Pass the user object instead of just the user ID
        })
        this.loggerService.log('task was created')
        await this.save(task)
    }



    async getTaskByID(id:number,user:User):Promise<Task>{
        const task=await this.findOne({where:{id:id,user:user}})
        if(!task){
            this.loggerService.error('not found')
            throw new NotFoundException()
            
        }
        return task
    }

    async deleteTask(id:number,user:User){
        try {
            const found=await this.getTaskByID(id,user)
            await this.delete(found)
        } catch (error) {
            console.log(error);
        }

    }


    async updateTask(id:number,updateTaskDto:UpdateTaskDto,user:User):Promise<Task>{
        const task=await this.getTaskByID(id,user)
        const{title,description,status}=updateTaskDto
        task.description=description
        task.status=status
        task.title=title
        this.save(task)
        return task
    }

    async updateTaskStatus(id:number,updateTaskStatus:UpdateTaskStatus,user:User):Promise<Task>{
        const task=await this.getTaskByID(id,user)
        const{status}=updateTaskStatus
        task.status=status
        await this.save(task)
        return task
    }

    async getAllTasks(user:User):Promise<Task[]>{
        const tasks=await this.find({where:{user:user}})
        return tasks
    }

    async getTaskWithFilter(getTaskFilter:GetTaskFilterDto):Promise<Task[]>{
        let filterTasks
        const{status,search}=getTaskFilter  
        if(status){
            filterTasks=await this.findBy({status:status})
        }
        if(search){
            filterTasks=await this.createQueryBuilder('task')
            .where('(task.title LIKE :search OR task.description LIKE :search)'
            ,{ search: `%${search}%` })
            .getMany()
        }

        return filterTasks

    }

}