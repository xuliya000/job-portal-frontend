import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-apply',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule],
  templateUrl: './apply.component.html',
})
export class ApplyComponent implements OnInit {
  form: FormGroup;
  jobId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      skills: this.fb.array([]),
      experiences: this.fb.array([])
    });
    this.jobId = '';
  }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.addSkill();
    this.addExperience();
  }

  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.group({ skillName: [''] }));
  }

  removeSkill(index: number): void {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  get experiences(): FormArray {
    return this.form.get('experiences') as FormArray;
  }

  addExperience(): void {
    this.experiences.push(this.fb.group({
      title: [''],
      description: [''],
      startDate: [''],
      endDate: ['']
    }));
  }

  removeExperience(index: number): void {
    if (this.experiences.length > 1) {
      this.experiences.removeAt(index);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields correctly before submitting.',
        confirmButtonColor: '#d33'
      });

      return;
    }

    const payload = {
      ...this.form.value,
      job: { id: this.jobId }
    };

    this.http.post('http://localhost:8080/v1/applications', payload).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted',
        text: 'Your application has been successfully sent!',
        confirmButtonColor: '#28a745'
      }).then(() => {
        this.router.navigate(['/']);
      });
    });
  }

}
