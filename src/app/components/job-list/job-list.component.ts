import { Component, OnInit } from '@angular/core';
import { JobService, Job } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  template: `<div *ngFor="let job of jobs">{{ job.title }}</div>`,
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
      console.log('Jobs:', data);
    });
  }
}
