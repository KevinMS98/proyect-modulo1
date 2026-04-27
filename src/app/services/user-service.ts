import { Injectable } from '@angular/core';
import { User } from '../models/interfaces';
import { UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  setUser(user: User): void {
    const users: User[] = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  async setTokenId(user: UserCredential) {
    const token = await user.user.getIdToken();
    console.log(token);
    localStorage.setItem('token', token);
  }
}
