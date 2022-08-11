import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@auth/dto';
import { UsersService } from '@auth/services';

@Injectable()
export class UsersSeeder {
  constructor(private usersService: UsersService) {}

  run() {
    this.createUsers();
  }

  createUsers() {
    const users: CreateUserDto[] = [];
    users.push({
      email: 'correo1@gmail.com',
      lastname: 'Perez',
      name: 'Juan',
      password: '12345678',
      passwordChanged: false,
      roles: ['ADMIN'],
      username: 'user1',
    });
    users.forEach((user) => {
      this.usersService.create(user);
    });
  }
}
