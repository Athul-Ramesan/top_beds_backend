// subscription.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class SubscriptionUpdateException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}