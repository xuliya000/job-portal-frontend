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
        this.applications = data;
        this.originalApplications = data;
      },
      error: (err) => {
        console.error('❌ Error loading company applications:', err);
      }
    });
  }

  private loadUserApplications(email: string): void {
    this.applicationService.getApplicationsByEmail(email).subscribe({
      next: (data) => {
        console.log(`📦 Applications for ${email}:`, data);
        this.applications = data;
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
