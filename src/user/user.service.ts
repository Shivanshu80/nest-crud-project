import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/userdto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './userModel/userSchema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    createUser(createUserDto: CreateUserDto) {
        try {
            const createdUser = new this.userModel({name: createUserDto.name, email: createUserDto.email, password: createUserDto.password});
            return createdUser.save();
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }
}
