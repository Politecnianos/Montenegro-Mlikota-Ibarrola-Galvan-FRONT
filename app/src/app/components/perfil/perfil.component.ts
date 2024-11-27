import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { Usuario } from '../../interfaces/Usuario';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  alumno : Usuario | undefined;
  idAlumno : number = 0;

  constructor(
    private usuarioService: UserServiceService,
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario(): void {
    const mail = localStorage.getItem('mail');
    if (mail) {
      this.usuarioService.getUsuarioDni(mail).subscribe(
        (response) => {
          this.idAlumno =response.dni;
          this.usuarioService.getUsuario(this.idAlumno).subscribe(
            (usuario) => {
              this.alumno = usuario;
          }, (error) => {
            console.error('Error al obtener usuario', error)
          })
        },
        (error) => {
          console.error('Error al obtener usuario:', error);
        }
      );
    } else {
      console.error('Correo no encontrado en localStorage');
    }
  }
}
