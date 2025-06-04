import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { ApplyComponent} from './components/apply/apply.component';
import { ApplicationsComponent} from './pages/applications/applications.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { LoginComponent } from './components/login/login.component';
import { LoginChoiceComponent } from './components/login-choice/login-choice.component';
import { RegisterComponent } from './components/register/register.component';
import { CandidateHomeComponent } from './pages/candidate-home/candidate-home.component';
import { RecruiterHomeComponent } from './pages/recruiter-home/recruiter-home.component'; 
import { TermsComponent } from './components/terms/terms.component';

export const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: 'add-job', component: AddJobComponent },
  { path: 'apply/:id', component: ApplyComponent },
  { path: 'job/:id', component: JobDetailComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-choice', component: LoginChoiceComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'candidate-home', component: CandidateHomeComponent },
  { path: 'recruiter-home', component: RecruiterHomeComponent },
  { path: 'terms', component: TermsComponent }
];
