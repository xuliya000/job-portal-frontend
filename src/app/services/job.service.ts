import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  id: string;
  title: string;
  companyName: string;
  description: string;
  location: string;
  responsibilities: string;
  qualifications: string;
  type: string;
  experienceLevel: string;
  salaryMin: number;
  salaryMax: number;
  createdDate: string;
  applicationCount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/v1/jobs'; 

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  getJobsByCompanyName(companyName: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/by-company?companyName=${encodeURIComponent(companyName)}`);
  }
  
}
