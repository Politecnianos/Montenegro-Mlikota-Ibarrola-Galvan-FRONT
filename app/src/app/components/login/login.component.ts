import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../interfaces/Usuario';
import { UserServiceService } from '../../services/Usuarios/userService.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mail : String = "";
  dni : number = 0;

  loginForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private router: Router, private alumnosService : UserServiceService) { }

  login() {
    if (this.loginForm.valid) {
      const mail = this.loginForm.value.mail ?? '';
      const contrasena = this.loginForm.value.contrasena ?? '';
  
      if (!mail.endsWith('@ipm.edu.ar')) {
        alert('Correo no válido. Debe ser un correo institucional (@ipm.edu.ar).');
        return;
      }
  
      this.alumnosService.login(mail, contrasena).subscribe(
        (response: string) => {
          localStorage.setItem('token', response);
          localStorage.setItem('mail', mail);
          this.router.navigate(['/Eventos']);
        },
        (error) => {
          console.error('Error de autenticación', error);
          alert('Correo o contraseña incorrectos');
        }
      );
    } else {
      console.error('Formulario inválido');
      alert('Verifique los datos ingresados');
    }
  }
  

}
