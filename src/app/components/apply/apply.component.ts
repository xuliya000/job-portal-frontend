import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apply',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
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

  submit(): void {
    const payload = {
      ...this.form.value,
      job: { id: this.jobId } // Backend expects a job reference object
    };

    this.http.post('http://localhost:8080/v1/applications', payload).subscribe(() => {
      alert('Application submitted successfully!');
      this.router.navigate(['/']);
    });
  }
}
