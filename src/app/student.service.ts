import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StudentService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data 
    getStudents() {
        return this.http.get('http://localhost:8000/students');
    }
    addStudents(firstName: string, lastName: string) {
        this.http.post('http://localhost:8000/students',{ firstName, lastName })
            .subscribe((responseData) => {
                console.log(responseData);
            }); 
        }
             
}