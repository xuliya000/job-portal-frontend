import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { ApplyComponent } from './components/apply/apply.component';
import { AddJobComponent } from './components/add-job/add-job.component';

// 👇 On importe les routes depuis app.routes.ts
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    ApplyComponent,
    AddJobComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)  // ✅ utilise maintenant les bonnes routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
