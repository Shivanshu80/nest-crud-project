import { User } from '../userModel/userSchema'

export class UserResponseDto {
    message!: string;
    data!: User[];
}