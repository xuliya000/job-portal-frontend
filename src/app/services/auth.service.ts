// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/api/auth';

    constructor(private http: HttpClient) {}

    register(userData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/register`, userData);
    }
    
    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, credentials);
    }
}
