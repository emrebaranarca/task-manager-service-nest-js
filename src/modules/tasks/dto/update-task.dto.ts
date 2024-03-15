import { IsEnum, IsNotEmpty } from "class-validator"
import { TaskStatus } from "../interfaces/task/task.interface"

export class UpdateTaskDto{
    @IsNotEmpty()
    title:string
    @IsNotEmpty()
    description:string
    @IsEnum(TaskStatus)
    status:TaskStatus
}