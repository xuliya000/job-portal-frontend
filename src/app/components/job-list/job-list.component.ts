import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule, FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import { JobService, Job } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})


export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  filterForm: FormGroup;
  sortOption: string = 'date-desc'; // default sorting: newest first


  constructor(private jobService: JobService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      location: [''],
      type: [''],
      experienceLevel: [''],
      salaryMin: [''],
      salaryMax: ['']
    });
  }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe({
      next: (data: Job[]) => {
        this.jobs = data;
        this.filteredJobs = data; // Affiche tout au départ
        this.sortJobs(); // initial sort
      },
      error: (err) => console.error('Failed to load jobs:', err),
    });
  }

  applyFilter(): void {
    const { location, type, experienceLevel, salaryMin, salaryMax } = this.filterForm.value;

    this.filteredJobs = this.jobs.filter(job => {
      return (
        (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
        (!type || job.type === type) &&
        (!experienceLevel || job.experienceLevel === experienceLevel)&&
        (!salaryMin || (job.salaryMin ?? 0) >= +salaryMin) &&
        (!salaryMax || (job.salaryMax ?? 0) <= +salaryMax)
      );
    });

    this.sortJobs(); // sort after filtering
  }

  resetFilters(): void {
    this.filterForm.setValue({
      location: '',
      type: '',             //  All Types
      experienceLevel: '',  //  All Levels
      salaryMin: '',
      salaryMax: ''
    });

    this.filteredJobs = [...this.jobs];
    this.sortJobs();
  }


  sortJobs(): void {
    switch (this.sortOption) {
      case 'date-desc':
        this.filteredJobs.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        break;
      case 'date-asc':
        this.filteredJobs.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
        break;
      case 'salary-desc':
        this.filteredJobs.sort((a, b) => (b.salaryMax ?? 0) - (a.salaryMax ?? 0));
        break;
      case 'salary-asc':
        this.filteredJobs.sort((a, b) => (a.salaryMin ?? 0) - (b.salaryMin ?? 0));
        break;
    }
  }
}
