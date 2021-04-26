import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  async getUserById(id): Promise<User> {
    return this.userModel.findById(id);
  }

  async updateUser(id, data): Promise<User> {
    const user = await this.userModel.findById(id);
    Object.assign(user, data);
    await user.save();
    return user;
  }

  async getUserByEmail(email, selectPassword = false): Promise<User> {
    if (!selectPassword) {
      return this.userModel.findOne({ email });
    }
    return this.userModel.findOne({ email }).select('email password').exec();
  }
}
