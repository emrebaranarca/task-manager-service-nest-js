import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Post, Put, Query, Req, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './interfaces/task/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatus } from './dto/update-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.entity';


@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private tasksService :TasksService){}

    @Get()
    getTasks(@Query() getTaskFilterDto:GetTaskFilterDto,@Request() req):Promise<Task[]>{
        const {status,search}=getTaskFilterDto
        const user:User=req.user
        if(status||search) return this.tasksService.getTaskWithFilter(getTaskFilterDto)
        else return this.tasksService.getAllTasks(user)
        
    }
    

    @Get('/:id')
    getTaskByID(@Param('id') id:number,@Request() req):Promise<Task>{
        const user:User=req.user
        return this.tasksService.getTaskByID(id,user)
    }

    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto,@Request() req ):Promise<void>{
        const user:User=req.user
        return this.tasksService.createaTask(createTaskDto,user)
    }

    @Delete('/:id')
    deleteTaskByID(@Param('id') id:number,@Request() req){
        const user:User=req.user
        return this.tasksService.deleteTask(id,user)
    }

    @Put('/:id/update-task')
    updateTask(@Param('id') id:number,@Body() updateTaskDto:UpdateTaskDto,@Request() req):Promise<Task>{
        const user:User=req.user
        return this.tasksService.updateTask(id,updateTaskDto,user)
    }

    @Patch('/:id/update-status')
    updateTaskStatus(@Param('id') id:number,@Body() updateTaskStatus:UpdateTaskStatus,@Request() req):Promise<Task>{
        const user:User=req.user
        return this.tasksService.updateTaskStatus(id,updateTaskStatus,user)
    }








}
