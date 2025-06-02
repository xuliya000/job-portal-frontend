import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService, Job } from '../../services/job.service';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  job: Job | null = null;
  jobId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.jobService.getJobById(this.jobId).subscribe({
        next: (data) => this.job = data,
        error: (err) => console.error('Failed to load job details', err)
      });
    }
  }
  
  
}
