import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { StudentService } from '../services/student.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [CommonModule, MatButtonModule, HttpClientModule, RouterModule],
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
  providers: [StudentService],
})
export class ListStudentsComponent implements OnInit {
  // Declare variable to hold response and make it public to be accessible from components.html
  public students: any[] = [];

  // Initialize the call using StudentService
  constructor(private myService: StudentService) {}

  // Method called on component initialization
  ngOnInit() {
    this.loadStudents();
  }

  // Method to fetch students
  loadStudents(): void {
    this.myService.getStudents().subscribe((data) => {
      this.students = data;
      console.log(data)
    });
  }

  onDelete(id: string): void {
    this.myService.deleteStudent(id).subscribe(
      () => {
        console.log(`Student with ID ${id} deleted.`);
        this.loadStudents(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }
}
