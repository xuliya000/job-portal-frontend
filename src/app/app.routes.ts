import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { AddJobComponent } from './components/add-job/add-job.component';

export const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: 'add-job', component: AddJobComponent },
  { path: '**', redirectTo: '' },
];
