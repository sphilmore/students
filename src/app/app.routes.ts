import { Routes } from '@angular/router';
import { ListStudentsComponent } from './list-students/list-students.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

export const routes: Routes = [
    {
        path: '',  // Default route, redirects to listStudents
        redirectTo: 'listStudents',
        pathMatch: 'full'
    },
    {
        path: 'listStudents',  //when students listed
        component: ListStudentsComponent
    },
    {
        path: 'addStudent',  //when students added 
        component: StudentFormComponent
    },
    {
        path: 'editStudent/:id',
        component: EditStudentComponent 
    },
    {
        path: '**',  //when path cannot be found, keep this at the bottom
        component: NotFoundComponent
    }
];
