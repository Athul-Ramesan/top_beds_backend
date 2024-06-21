import { IsDateString, IsNumber, IsObject, IsString,  } from 'class-validator'
import { PropertyDto } from './propertyDto'

export class makePaymentDto{
    
    @IsObject()
    property:PropertyDto

    @IsDateString()
    startDate:Date

    @IsDateString()
    endDate:Date

    @IsString()
    title:string

    @IsNumber()
    price:number

    @IsNumber()
    guests:number

    @IsNumber()
    nights:number
}
