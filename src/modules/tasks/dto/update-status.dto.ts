import { IsEnum } from "class-validator";
import { TaskStatus } from "../interfaces/task/task.interface";

export class UpdateTaskStatus{

    @IsEnum(TaskStatus)
    status:TaskStatus
}