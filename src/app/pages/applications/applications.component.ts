import { Component, OnInit } from '@angular/core';
import { Application, ApplicationService } from '../../services/application.service';
import {  Job } from '../../services/job.service';

import { JobService } from '../../services/job.service';
import { DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  imports: [CommonModule, DatePipe, FormsModule],
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  originalApplications: Application[] = [];
  isRecruiter = false;
  userEmail = '';
  companyName = '';
  selectedJobId: string = '';
  jobs: Job[] = [];
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(
    private applicationService: ApplicationService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const email = user?.email;
    const company = user?.companyName;

    if (company) {
      this.isRecruiter = true;
      this.companyName = company;

      this.jobService.getJobsByCompanyName(company).subscribe({
        next: (jobs) => {
          console.log('✅ Jobs loaded for recruiter:', jobs);
          this.jobs = jobs;
        },
        error: (err) => {
          console.error('❌ Failed to load jobs for company:', err);
        }
      });
      
      // 🔹 Charger toutes les candidatures liées à la company
      this.loadApplicationsByCompany(company);
    } else if (email) {
      this.userEmail = email;
      this.loadUserApplications(email);
    }
  }

  private loadApplicationsByCompany(companyName: string): void {
    this.applicationService.getApplicationsByCompany(companyName).subscribe({
      next: (data) => {
        console.log(`🏢 Applications for company ${companyName}:`, data);
        this.originalApplications = data;
        this.applications = [...data]; // clone pour ne pas affecter l'original
        this.sortApplications(); // 👈 tri ici
      },
      error: (err) => {
        console.error('❌ Error loading company applications:', err);
      }
    });
  }
  

  sortApplications() {
    this.applications.sort((a, b) => {
      const timeA = new Date(a.submittedAt).getTime();
      const timeB = new Date(b.submittedAt).getTime();
      return this.sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }

  private loadUserApplications(email: string): void {
    this.applicationService.getApplicationsByEmail(email).subscribe({
      next: (data) => {
        console.log(`📦 Applications for ${email}:`, data);
        this.originalApplications = data;
        this.applications = data;
        this.sortApplications(); // 👈 tri ici aussi
      },
      error: (err) => {
        console.error('❌ Error loading user applications:', err);
      }
    });
  }
  

  filterByJob(): void {
    if (!this.selectedJobId) {
      this.applications = [...this.originalApplications];
    } else {
      this.applications = this.originalApplications.filter(app => app.job.id === this.selectedJobId);
    }
  }
}
