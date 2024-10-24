import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// We know that response will be in JSON format
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) {}

  // Uses http.get() to load data 
  getStudents() {
    return this.http.get<any[]>('http://localhost:8000/students'); // Specify the return type as an array of any type
  }

  addStudents(firstName: string, lastName: string) {
    this.http.post('http://localhost:8000/students', { firstName, lastName })
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  deleteStudent(studentId: string) {
    return this.http.delete(`http://localhost:8000/students/${studentId}`); // Return the observable
  }

  updateStudent(studentId: string, firstName: string, lastName: string) {
    this.http.put(`http://localhost:8000/students/${studentId}`, { firstName, lastName })
      .subscribe(() => {
        console.log('Updated: ' + studentId);
      });
  }

  // Uses http.get() to request data based on student id 
  getStudent(studentId: string) {
    return this.http.get(`http://localhost:8000/students/${studentId}`);
  }
}
