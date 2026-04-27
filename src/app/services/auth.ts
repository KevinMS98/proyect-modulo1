import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) { }
  // En auth.ts
  getToken(): string | null {
    return sessionStorage.getItem('tokenId');
  }

  async register({ email, password }: { email: string, password: string }) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      const token = await user.user.getIdToken();
      console.log('token', token);
      sessionStorage.setItem('tokenId', token);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }: { email: string, password: string }) {
    try {
      const user: UserCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('user', user);
      const token = await user.user.getIdToken();
      sessionStorage.setItem('tokenId', token);
      console.log(token);
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
