import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { AddJobComponent } from './components/add-job/add-job.component';
<<<<<<< HEAD
import {ApplyComponent} from './components/apply/apply.component';
=======
import { ApplyComponent } from './components/apply/apply.component';

>>>>>>> 66a24b3 (Filtres)

export const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: 'add-job', component: AddJobComponent },
<<<<<<< HEAD
  { path: 'jobs/:id/apply', component: ApplyComponent }
=======
  { path: 'apply/:id', component: ApplyComponent },
>>>>>>> 66a24b3 (Filtres)
];
