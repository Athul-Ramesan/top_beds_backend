import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionPlanDto } from './dto/createSubscriptionPlanDto';
import { UpdateSubscriptionPlanDto } from './dto/updateSubscriptionPlan.dto';
import { subscribeDto } from './dto/subscribeDto';

@Controller('subscription')
export class SubscriptionController {

  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Post('create')
  create(@Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    console.log("🚀 ~ SubscriptionController ~ create ~ createSubscriptionPlanDto:", createSubscriptionPlanDto)

    return this.subscriptionService.create(createSubscriptionPlanDto);
  }
  @Get('get')
  findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    console.log("🚀 ~ SubscriptionController ~ update ~ id:", id)
    return this.subscriptionService.update(id, updateSubscriptionPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("🚀 ~ SubscriptionController ~ remove ~ id:", id)
    return this.subscriptionService.remove(id);
  }
  @Post('confirm')
  subscribe(@Body() data){
    console.log('🍕🍕🍕🍕 its pizza time 🍕🍕🍕')
    console.log("🚀 ~ SubscriptionController ~ subscribe ~ data:", data)
    const { userId, planId, session_id } = data
    return this.subscriptionService.subscribe(userId, planId, session_id)
  }
  @Post('make-payment-session')
  makePaymentSession(@Body() data) {
    console.log("🚀 ~ SubscriptionController ~ makePaymentSession ~ data:", data)
    const { amount, name } = data
    return this.subscriptionService.makePaymentSession(name, amount)
  }

  @Get('payment-session-status/:sessionId')
  async getSessionStatus(@Param('sessionId') sessionId: string) {
    console.log("🚀 ~ SubscriptionController ~ getSessionStatus ~ sessionId:", sessionId)
    return this.subscriptionService.getSessionStatus(sessionId);
  }
  //   @Post('make-payment')
  //   makePayment(@Body()data){
  //     console.log("🚀 ~ SubscriptionController ~ makePayment ~ data:", data
  //       const {paymentMethodId, paymentIntentId} = data
  //       return this.subscriptionService.makePayment(paymentMethodId,paymentIntentId)
  //       }

  //     )
  // )

}
