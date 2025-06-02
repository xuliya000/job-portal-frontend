import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Experience {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Application {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  submittedAt: string;
  job: {
    title: string;
  };
  skills: { skillName: string }[];
  experiences: Experience[];
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private baseUrl = 'http://localhost:8080/v1/applications';

  constructor(private http: HttpClient) {}

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseUrl);
  }
}
