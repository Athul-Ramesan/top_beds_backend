import { IsBoolean, IsDate, IsString } from "class-validator";


export class subscribeDto{

    @IsString()
    _id:string

    @IsString()
    plan:string;

    @IsDate()
    startDate:Date;

    @IsDate()
    endDate:Date;


    @IsBoolean()
    status:boolean
    
}