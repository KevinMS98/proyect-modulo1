import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/interfaces';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  submitted = signal(false);
  loading = signal(false);

  registerForm = this.fb.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async register() {
    this.submitted.set(true);
    if (this.registerForm.invalid) {
      this.submitted.set(false);
      return;
    }
    this.loading.set(true);
    const { username, name, email, password } = this.registerForm.value;
    const myUser: User = { username: username!, name: name!, email: email! };
    this.userService.setUser(myUser);
    this.registerForm.reset();
    const user = await this.authService.register({ email: email!, password: password! });
    if (user) {
      this.userService.setTokenId(user);
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      console.error('Registration failed');
    }
    this.submitted.set(false);
    this.loading.set(false);
  }

}
