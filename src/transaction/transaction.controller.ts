import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransformInterceptor } from '../transform.interceptor';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService, private userService: UserService) {}

  @Post('balance')
  @UseGuards(AuthGuard('api-key'))
  @UseInterceptors(TransformInterceptor)
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    if (createTransactionDto.amount < 0) {
      throw new HttpException('Amount is not valid!', HttpStatus.BAD_REQUEST);           
    }
    let user = await this.userService.findOne(createTransactionDto.account);
    if (!user) {
      throw new HttpException('Account not found!', HttpStatus.BAD_REQUEST);           
    }
    createTransactionDto.type = 'CR';
    return this.transactionService.addBalance(createTransactionDto);
  }
}
