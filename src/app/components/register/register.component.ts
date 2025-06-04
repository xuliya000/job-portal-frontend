import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,           // <- important
  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  @Input() profile!: 'candidate' | 'recruiter';
  registerForm!: FormGroup;
  errorMessage = ''
  successMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  
  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      companyName: [''],
      acceptTerms: [false, Validators.requiredTrue],
      subscribeNewsletter: [false]
    });

    if (this.profile === 'recruiter') {
      this.registerForm.get('companyName')?.setValidators(Validators.required);
      this.registerForm.get('companyName')?.updateValueAndValidity();
    }
  }
  
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
  
      // Ne pas afficher un message global si seul "acceptTerms" est fautif
      if (this.registerForm.get('acceptTerms')?.invalid) {
        this.errorMessage = ''; // pas besoin de redondance, c’est géré dans le HTML
      } else {
        this.errorMessage = 'Please fill all required fields correctly.';
      }
      return;
    }
  
    const formData = {
      ...this.registerForm.value,
      role: this.profile
    };
  
    const { role, ...userData } = formData;
  
    this.authService.register(userData).subscribe({
      next: () => {
        // 👇 Connexion automatique après inscription
        const loginPayload = {
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        };
  
        this.authService.login(loginPayload).subscribe({
          next: (res) => {
            // 🔐 Sauvegarde du token et de l'utilisateur
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
  
            if (res.user.companyName) {
              this.router.navigate(['/recruiter-home']);
            } else {
              this.router.navigate(['/candidate-home']);
            }
      
          },
          error: (err) => {
            console.error('Auto-login failed:', err);
            this.errorMessage = 'Registration succeeded, but auto-login failed.';
          }
        });
      },
      error: (err) => {
        console.error('Registration error:', err);
        if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else if (typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = 'Registration failed.';
        }
      }
    });
  }
  
  
}
