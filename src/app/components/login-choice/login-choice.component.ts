import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login-choice',
  standalone: true,                  
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './login-choice.component.html',
  styleUrls: ['./login-choice.component.scss']
})
export class LoginChoiceComponent {
  selectedProfile: 'candidate' | 'recruiter' | null = null;
  showRegister = false;
  errorMessage = '';

  selectProfile(profile: 'candidate' | 'recruiter') {
    this.selectedProfile = profile;
    this.showRegister = false;
    this.errorMessage = '';
  }

  openRegister(event?: Event) {
    event?.preventDefault();
    this.showRegister = true;
  }

  backToLogin(event?: Event) {
    event?.preventDefault();
    this.showRegister = false;
  }

  handleRoleMismatch(message: string) {
    this.errorMessage = message;
  }
}
