import { Component, OnInit } from '@angular/core';
import { Application, ApplicationService } from '../../services/application.service';
import {DatePipe} from '@angular/common';
import { CommonModule } from '@angular/common';


interface Experience {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  imports: [
    DatePipe,CommonModule
  ],
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.applicationService.getAllApplications().subscribe({
      next: (data) => {
        console.log('📦 Received applications:', data);  //
        this.applications = data;
      },
      error: (err) => {
        console.error('❌ Failed to load applications:', err);
      },
    });
  }

}
