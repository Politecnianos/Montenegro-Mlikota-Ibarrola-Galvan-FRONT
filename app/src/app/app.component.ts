import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component'; 

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [LoginComponent] 
})
export class AppComponent {
  title = 'Politecnianos';
}
