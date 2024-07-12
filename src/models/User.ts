// src/models/User.ts

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'devops' | 'developer';
  password: string;
}
