import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, TransactionDocument, TransactionSchema } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>){}
  async addBalance(createTransactionDto: CreateTransactionDto) {
    let lastTransaction = await this.transactionModel.findOne({
      account: createTransactionDto.account
    }).select('balance').sort({
      createdAt: 'desc'
    })
    let lastBalance = lastTransaction ? lastTransaction.balance : 0;
    createTransactionDto.balance = lastBalance + Number(createTransactionDto.amount);
    return this.transactionModel.create(createTransactionDto);
  }
}
