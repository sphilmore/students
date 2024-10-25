import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/students'; 

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getStudentById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addStudent(firstName: string, lastName: string): Observable<any> {
    const studentData = { firstName, lastName };
    return this.http.post(this.apiUrl, studentData);
  }

  updateStudent(id: string, studentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, studentData);
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
