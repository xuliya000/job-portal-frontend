import { Component, DoCheck } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'job-portal-frontend';
  isLoggedIn = false;
  user: any = null;

  constructor(private router: Router) {}

  ngDoCheck() {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    // Si l'utilisateur a changé, on met à jour
    if (token && storedUser && (!this.user || this.user.email !== storedUser.email)) {
      this.user = storedUser;
      this.isLoggedIn = true;
    } else if (!token || !storedUser) {
      this.user = null;
      this.isLoggedIn = false;
    }
  }

  isRecruiter(): boolean {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    return !!storedUser?.companyName; // renvoie true seulement si companyName est une chaîne non vide
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
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['/']);
  }

  getCompanyName(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.companyName || 'Company';
  }

}
