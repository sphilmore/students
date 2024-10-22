import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from './student.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentFormComponent } from './student-form/student-form.component';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, StudentFormComponent, MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrected property name
  providers: [StudentService]
})
export class AppComponent implements OnInit {
  title = 'Students App';
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
}

 