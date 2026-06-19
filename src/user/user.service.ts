import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/userdto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './userModel/userSchema';
import { UserResponseDto } from './dto/returnAllUserDto'

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(createUserDto: CreateUserDto) {
        try {
            const createdUser = new this.userModel({ name: createUserDto.name, email: createUserDto.email, password: createUserDto.password });
            return await createdUser.save();
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }

    async getUsers(): Promise<UserResponseDto> {
        try {
            const allUser = await this.userModel.find();
            if (allUser.length === 0) {
                return {
                    message: 'No User Found',
                    data: [] as User[],
                };
            } else {
                return {
                    message: 'All User Fetch successfully',
                    data: allUser as User[],
                }
            }

        } catch (error) {
            console.error('Error To fetch Users', error);
            throw new Error('Failed to fetch Users')
        }
    }

    async getUserById(id: string): Promise<UserResponseDto> {
        try {
            const oneUser = await this.userModel.findById(id);
            if (!oneUser) {
                return {
                    message: 'No User Found',
                    data: [] as User[],
                };
            }
            console.log('oneUser', oneUser)
            return {
                message: 'User Get successfully',
                data: [oneUser] as User[],
            }

        } catch (error) {
            console.error('Error To save User', error);
            throw new Error('Failed to save User')
        }
    }

    async updateUserById(id: string, createUserDto: CreateUserDto): Promise<UserResponseDto> {
         try {
            const updateUser = await this.userModel.findByIdAndUpdate(id,createUserDto);
            return{
                message:'User Updated Successfully',
                data:[updateUser] as User[]
            }
            
         } catch (error) {
            console.error(error)
            throw new Error('Failed to Update User')
         }
    }

    async deleteUserById(id:string): Promise<UserResponseDto>{
        try {
            const deleteUser = await this.userModel.findByIdAndDelete(id)
            return{
                message:'User Deleted Successfully',
                data:[deleteUser] as User[]
            }
        } catch (error) {
            console.error(error)
            throw new Error('Failed to Delete User')
        }
    }
}
