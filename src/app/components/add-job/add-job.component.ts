import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService, Job } from '../../services/job.service';

@Component({
  selector: 'app-add-job',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
  jobForm!: FormGroup; // 使用 `!` 延迟初始化，避免类型检查错误

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      companyName: ['', [Validators.required]],
      description: ['', Validators.required],
      location: ['', Validators.required],
      type: ['FULL_TIME', Validators.required],
      experienceLevel: ['JUNIOR', Validators.required],
      responsibilities: [''],
      qualifications: [''],
      salaryMin: [0, [Validators.required, Validators.min(0)]],
      salaryMax: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    console.log(this.jobForm.value);

    if (this.jobForm.valid) {
      const job: Job = this.jobForm.value as Job;
      this.jobService.createJob(job).subscribe({
        next: () => {
          alert('Job created successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Failed to create job:', err);
          alert('Failed to create job.');
        }
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
