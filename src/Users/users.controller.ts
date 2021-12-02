import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.model';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  addUser(
    @Body('birth_date') userBirthDate: string,
    @Body('email') userEmail: string,
    @Body('id') userId: string,
    @Body('name') userName: string,
    @Body('last_name') userLastName: string,
  ): User {
    return this.userService.addUser(
      userEmail,
      userId,
      userName,
      userLastName,
      userBirthDate,
    );
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }

  @Patch(':id')
  editUser(
    @Param('id') userId: string,
    @Body('email') userEmail: string,
    @Body('id') userEditId: string,
    @Body('name') userName: string,
    @Body('last_name') userLastName: string,
    @Body('bith_date') userBirthDate: string,
  ) {
    this.userService.editUser(
      userId,
      userEmail,
      userEditId,
      userName,
      userLastName,
      userBirthDate,
    );
  }

  @Delete(':id')
  removeUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
