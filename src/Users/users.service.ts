import { Injectable, NotFoundException } from '@nestjs/common';
import { ProvidedRequiredArgumentsRule } from 'graphql';
import { User } from './user.model';

@Injectable()
export class UserService {
  date = new Date();
  private users: User[] = [
    {
      email: 'david123@gamil.com',
      id: '12343058395',
      name: 'david',
      last_name: 'kafka',
      birth_date: '2000-12-02',
    },

    {
      email: 'Olivia@gamil.com',
      id: '12343058391',
      name: 'Olivia',
      last_name: 'Dimick',
      birth_date: '2004-11-02',
    },
    {
      email: 'Noah@gamil.com',
      id: '13343058391',
      name: 'Noah',
      last_name: 'Easterlin',
      birth_date: '2004-11-15',
    },
    {
      email: 'Charlotte@gamil.com',
      id: '13343058691',
      name: 'Charlotte',
      last_name: 'York',
      birth_date: '2004-10-15',
    },
    {
      email: 'William@gamil.com',
      id: '13543058691',
      name: 'William',
      last_name: 'Felch',
      birth_date: '2004-10-25',
    },
    {
      email: 'Liam@gamil.com',
      id: '12343058225',
      name: 'Liam',
      last_name: 'Biffle',
      birth_date: '2000-11-02',
    },
  ];

  addUser(
    email: string,
    id: string,
    name: string,
    last_name: string,
    birth_date: string,
  ) {
    const newUser = new User(email, id, name, last_name, birth_date);
    this.users.push(newUser);
    return newUser;
  }

  getAllUsers() {
    return [...this.users];
  }

  getUser(userId: string) {
    const user = this.findUser(userId);
    return { ...user };
  }

  findUser(userId: string) {
    const wantedUser = this.users.find((user) => user.id === userId);
    if (!wantedUser) {
      throw new NotFoundException('User does not exist.');
    } else {
      return wantedUser;
    }
  }

  findIndex(userId: string) {
    const userIndex = this.users.indexOf(this.findUser(userId));
    if (userIndex === -1) {
      throw new NotFoundException('User does not exist.');
    } else {
      return userIndex;
    }
  }

  editUser(
    userId: string,
    email: string,
    id: string,
    name: string,
    last_name: string,
    birth_date: string,
  ) {
    const userIndex = this.findIndex(userId);
    const wantedUser = this.findUser(userId);

    const newUser = { ...wantedUser };
    if (email) {
      newUser.email = email;
    }
    if (id) {
      newUser.id = id;
    }
    if (name) {
      newUser.name = name;
    }
    if (last_name) {
      newUser.last_name = last_name;
    }
    if (birth_date) {
      newUser.birth_date = birth_date;
    }
    this.users[userIndex] = { ...newUser };
  }

  deleteUser(userId: string) {
    const userIndex = this.findIndex(userId);
    this.users.splice(userIndex, 1);
    return this.users;
  }
}
