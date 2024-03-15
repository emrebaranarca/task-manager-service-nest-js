import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatus } from './dto/update-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';;
import { Task } from './task.entity';
import { User } from '../auth/user.entity';


@Injectable()
export class TasksService {
    constructor(
        private taskRepository: TaskRepository
      ) {}

    getAllTasks(user:User):Promise<Task[]>{
        return this.taskRepository.getAllTasks(user)
    }


    getTaskWithFilter(getTaskFilter:GetTaskFilterDto):Promise<Task[]>{
        return this.taskRepository.getTaskWithFilter(getTaskFilter)
    }

    
    getTaskByID(id:number,user:User):Promise<Task>{
        return this.taskRepository.getTaskByID(id,user)
    }

    createaTask(createTaskDto:CreateTaskDto,user:User):Promise<void>{
        return this.taskRepository.createTask(createTaskDto,user)
    }

    deleteTask(id:number,user:User){
        this.taskRepository.deleteTask(id,user)
    }

    updateTask(id:number,updateTaskDto:UpdateTaskDto,user:User):Promise<Task>{
        return this.taskRepository.updateTask(id,updateTaskDto,user)
    }


    updateTaskStatus(id:number,updateTaskStatus:UpdateTaskStatus,user:User):Promise<Task>{
        return this.taskRepository.updateTaskStatus(id,updateTaskStatus,user)
    }





}
