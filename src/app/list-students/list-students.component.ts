import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { StudentService } from '../student.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [CommonModule, MatButtonModule,HttpClientModule,RouterModule],
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
  providers: [StudentService]
})
export class ListStudentsComponent  implements OnInit{
 // Declare variable to hold response and make it public to be accessible from components.html
 public students: any;

 // Initialize the call using StudentService
 constructor(private myService: StudentService) { }

 // Method called on component initialization
 ngOnInit() {
   this.getStudents();
 }

 // Method to fetch students
 getStudents() {
   this.myService.getStudents().subscribe({
     // Read data and assign to public variable students
     next: (data => { this.students = data }),
     error: (err => console.error(err)),
     complete: (() => console.log('finished loading'))
   });
 }
 
 onDelete(studentId: string) {
   this.myService.deleteStudent(studentId);
}
 
}
