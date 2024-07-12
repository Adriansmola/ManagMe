// src/services/UserService.ts

import { User } from '../models/User';

export class UserService {
  static getLoggedInUser(): User {
    // Zakładając, że tylko admin jest zalogowany
    return {
      id: '1',
      firstName: 'Admin',
      lastName: 'Adminowski',
      email: 'admin@example.com',
      role: 'admin',
      password: "123"
    };
  }

  static getUsers(): User[] {
    // Zamockowana lista użytkowników
    return [
      {
        id: '1',
        firstName: 'Admin',
        lastName: 'Adminowski',
        email: 'admin@example.com',
        role: 'admin',
        password: "xxx1123"
      },
      {
        id: '2',
        firstName: 'Dev',
        lastName: 'Ops',
        email: 'devops@example.com',
        role: 'devops',
        password: "123"
      },
      {
        id: '3',
        firstName: 'Developer',
        lastName: 'Deweloperski',
        email: 'developer@example.com',
        role: 'developer',
         password: "123"
      },
    ];
  }
}
