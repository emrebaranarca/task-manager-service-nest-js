import { IsEnum, IsOptional } from "class-validator"
import { TaskStatus } from "../interfaces/task/task.interface"

export class GetTaskFilterDto{
    @IsOptional()
    search?:string

    @IsOptional()
    @IsEnum(TaskStatus)
    status?:TaskStatus
}