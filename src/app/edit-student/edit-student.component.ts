import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule]
})
export class EditStudentComponent implements OnInit {
  studentForm: FormGroup;
  studentId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    if (this.studentId) {
      this.studentService.getStudentById(this.studentId).subscribe((student) => {
        this.studentForm.patchValue(student);
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid && this.studentId) {
      this.studentService.updateStudent(this.studentId, this.studentForm.value).subscribe(
        () => {
          console.log('Student updated successfully');
          this.router.navigate(['/listStudents']);
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    }
  }
}
