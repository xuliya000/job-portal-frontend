import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService, Job } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe({
      next: (data: Job[]) => (this.jobs = data),
      error: (err: any) => console.error('Failed to load jobs:', err),
    });
  }


}
