import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() profile!: 'candidate' | 'recruiter';
  @Output() roleMismatch = new EventEmitter<string>();

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid credentials.';
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        const role = res.user.companyName ? 'recruiter' : 'candidate';

        // Vérification de cohérence de rôle
        if (role !== this.profile) {
          this.roleMismatch.emit(`You selected "${this.profile}" but this account is a "${role}".`);
          return;
        }

        // Redirection selon le rôle
        if (role === 'candidate') {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}