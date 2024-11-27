import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { Usuario } from '../../interfaces/Usuario';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  alumno : Usuario | undefined;
  idAlumno : number = 0;
  idAlumnoSesion : number = 0;
  egresado : boolean = false;

  constructor(
    private usuarioService: UserServiceService,
    private route:ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idAlumno = parseInt(this.route.snapshot.params['id'], 10);
    this.obtenerUsuario();
    this.getUsuarioDueno();
  }

  obtenerUsuario(): void {
      this.usuarioService.getUsuario(this.idAlumno).subscribe(
        (response) => {
          this.alumno =response
        },
        (error) => {
          console.error('Error al obtener usuario:', error);
        }
      );
  }

  getUsuarioDueno(): void {
    const mail = localStorage.getItem('mail');
    if (mail) {
      this.usuarioService.getUsuarioDni(mail).subscribe(
        (response) => {
          this.idAlumnoSesion = response.dni;
        },
        (error) => {
          console.error("Error al obtener el usuario:", error);
        }
      );
    } else {
      console.error("No se encontró el correo en localStorage.");
    }
      let fecha = new Date().getFullYear();
      let digitos = fecha.toString().slice(-2);

      if(localStorage.getItem('mail')?.includes(digitos)){
        this.egresado = true;
        console.log("es egresadoooo")
      }
    }

    eliminarAlumno() : void{
      if(confirm("¿Estás seguro que deseas eliminar esta cuenta?")){
        this.usuarioService.eliminarUsuario(this.idAlumno).subscribe(
          (response) => {
            console.log("Cuenta eliminada correctamente")
            if(this.idAlumno == this.idAlumnoSesion){
              this.router.navigateByUrl('/login')
            }else{
              this.router.navigateByUrl('/Eventos')
            }
          },
          (error) =>{
            console.log("La cuenta no pudo eliminarse", error);
          }
        )
      }
    }
}


