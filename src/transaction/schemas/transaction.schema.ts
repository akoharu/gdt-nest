import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TransactionDocument = Transaction & Document;

@Schema({timestamps: true})
export class Transaction {
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  balance: number;
  @Prop({ required: true })
  type: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  account: User;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
