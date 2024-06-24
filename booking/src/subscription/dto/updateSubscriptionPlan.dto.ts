import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionPlanDto } from './createSubscriptionPlanDto';


export class UpdateSubscriptionPlanDto extends PartialType(CreateSubscriptionPlanDto) {}