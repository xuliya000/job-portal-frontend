import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { ApplyComponent} from './components/apply/apply.component';
import { ApplicationsComponent} from './pages/applications/applications.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

export const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: 'add-job', component: AddJobComponent },
  { path: 'apply/:id', component: ApplyComponent },
  { path: 'job/:id', component: JobDetailComponent },
  { path: 'applications', component: ApplicationsComponent }
];
