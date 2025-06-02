import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { JobService, Job } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  filterForm: FormGroup;

  constructor(private jobService: JobService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      location: [''],
      type: [''],
      experienceLevel: ['']
    });
  }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe({
      next: (data: Job[]) => {
        this.jobs = data;
        this.filteredJobs = data; // Affiche tout au départ
      },
      error: (err) => console.error('Failed to load jobs:', err),
    });
  }

  applyFilter(): void {
    const { location, type, experienceLevel } = this.filterForm.value;

    this.filteredJobs = this.jobs.filter(job => {
      return (
        (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
        (!type || job.type === type) &&
        (!experienceLevel || job.experienceLevel === experienceLevel)
      );
    });
  }
}
