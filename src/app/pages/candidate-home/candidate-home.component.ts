import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Router } from '@angular/router';
import { JobListComponent } from '../../components/job-list/job-list.component';

@Component({
  selector: 'app-candidate-home',
  standalone: true,
  imports: [CommonModule, RouterModule, JobListComponent],
  templateUrl: './candidate-home.component.html',
  styleUrl: './candidate-home.component.scss'
})

export class CandidateHomeComponent {
  user: any = null;

  constructor(private router: Router) {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        this.user = JSON.parse(stored);
      } catch (e) {
        console.error('Invalid user in localStorage');
        this.user = null;
      }
    }
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  getInitial(): string {
    return this.user?.lastName?.charAt(0).toUpperCase() || '';
  }

  getFirstName(): string {
    return this.user?.firstName || '';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login-choice']);
  }
}