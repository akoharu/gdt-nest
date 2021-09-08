import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: any) {
    return this.userModel.findById(id).exec();
  }
}
