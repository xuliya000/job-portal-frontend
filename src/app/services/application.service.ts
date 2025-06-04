import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from './job.service';

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
    id: string; // 👈 AJOUTER CECI
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

  /** Ajoute le header Authorization si le token est présent */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }


  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getApplicationsByEmail(email: string): Observable<Application[]> {
    const url = `${this.baseUrl}?email=${encodeURIComponent(email)}`;
    return this.http.get<Application[]>(url, {
      headers: this.getAuthHeaders(),
    });
  }

  submitApplication(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  getApplicationsByCompany(companyName: string): Observable<Application[]> {
    const url = `${this.baseUrl}/by-company?companyName=${encodeURIComponent(companyName)}`;
    return this.http.get<Application[]>(url, {
      headers: this.getAuthHeaders(),
    });
  }
  
}
