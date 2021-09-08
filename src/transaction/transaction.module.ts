import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema}]), UserModule
  ]
})
export class TransactionModule {}
