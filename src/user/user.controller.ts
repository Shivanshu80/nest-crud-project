import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/userDto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getAllUser() {
        return this.userService.getUsers();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
        return this.userService.updateUserById(id, createUserDto)
    }

    @Delete(':id')
    deleteUser(@Param('id') id:string){
        return this.userService.deleteUserById(id);
    }

}
