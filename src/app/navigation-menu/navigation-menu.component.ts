import { Component } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, RouterModule],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css'

})
export class NavigationMenuComponent {

}
