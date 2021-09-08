import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '../transform.interceptor';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('api-key'))
  @UseInterceptors(TransformInterceptor)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('api-key'))
  @UseInterceptors(TransformInterceptor)
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
}
