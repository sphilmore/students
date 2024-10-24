import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { StudentService } from '../student.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'] 
})
export class StudentFormComponent implements OnInit{
public mode = 'Add';
private id: any;
private student: any

  constructor(private myService: StudentService,private router:Router, public route: ActivatedRoute) { }
  studentForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
    
  });

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
            this.mode = 'Edit'; /*request had a parameter _id */
            this.id = paramMap.get('_id');

            //request student info based on the id
            this.myService.getStudent(this.id).subscribe({
                next: (data => {
                    //read data and assign to private variable student
                    this.student = data;
                    //populate the firstName and lastName on the page
                    this.studentForm.patchValue({
                        firstName: this.student.firstName,
                        lastName: this.student.lastName
                    })
                }),

                error: (err => console.error(err)),
                complete: (() => console.log('finished loading'))
            });
        }
        else {
            this.mode = 'Add';
            this.id = null;
        }
    });
}

  onSubmit(){
    let firstName = this.studentForm.get('firstName')?.value ?? "";
    let lastName = this.studentForm.get('lastName')?.value ?? "";
    console.log("You submitted: " + firstName + " " + lastName);
    if (this.mode == 'Add')
      this.myService.addStudents(firstName, lastName);
  if (this.mode == 'Edit')
      this.myService.updateStudent(this.id, firstName, lastName);
    this.router.navigate(['/listStudents']);
  }
}
    