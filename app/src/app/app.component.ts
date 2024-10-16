import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component'; 
import { RouterOutlet } from '@angular/router';
import { RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule,


  ]
})
export class AppComponent {
  title = 'Politecnianos';
  constructor(private http : HttpClient) {}


}
