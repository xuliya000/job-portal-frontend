import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService, Job } from '../../services/job.service';
import Swal from 'sweetalert2';

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
      responsibilities: ['', Validators.required],
      qualifications: ['', Validators.required],
      salaryMin: [0, [Validators.required, Validators.min(0)]],
      salaryMax: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Posting',
        text: 'Please fill in all required fields correctly before submitting.',
        confirmButtonColor: '#d33',
      });
      return;
    }
    const job = this.jobForm.value;

    this.jobService.createJob(job).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Job Created',
          text: 'Your job post has been successfully added!',
          confirmButtonColor: '#28a745'
        });
        this.jobForm.reset();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'There was an error submitting the job. Please try again.',
          confirmButtonColor: '#d33',
        });
      }
    });
  }
}
