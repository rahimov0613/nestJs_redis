import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop()
  user_id: string;

  @Prop()
  total: number;

  @Prop()
  tax: number;

  @Prop()
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
