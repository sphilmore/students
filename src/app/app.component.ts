import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from './student.service';
import { HttpClientModule } from '@angular/common/http';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, NavigationMenuComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrected property name
  providers: [StudentService]
})
export class AppComponent {
  title = 'Students App';
}


 