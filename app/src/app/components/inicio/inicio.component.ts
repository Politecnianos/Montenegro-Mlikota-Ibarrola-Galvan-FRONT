import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MensajesService } from '../../services/Mensajes/mensajes.service';
import { Mensaje } from '../../interfaces/Mensaje';
import { CommonModule } from '@angular/common';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    MensajeComponent,
    RouterLink,
    NgxPaginationModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  mensajes : Mensaje[] = [];
  idAlumno : number = 0;
  egresado: boolean = false;
  public page : number = 1;

  constructor(private msjService : MensajesService, private usuarioService : UserServiceService){}

  ngOnInit(): void {
    this.getMensajes();
    this.getUsuarioDueno();
  }


  getMensajes(): void {
    this.mensajes = [];
    this.msjService.getMensajes().subscribe((response) => {
      if (response) {
        this.mensajes = response.filter((mensaje) => mensaje.seccion === 'Eventos');
      } else {
        console.error('Error: No se pudo obtener la lista de mensajes');
      }
    });
  }

  getUsuarioDueno(): void {
    const mail = localStorage.getItem('mail');
    if (mail) {
      this.usuarioService.getUsuarioDni(mail).subscribe(
        (response) => {
          this.idAlumno = response.dni;
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
      console.log("es egresado")
    }
  }
  

  actualizarMensajes(idEliminado: number): void {
    this.mensajes = this.mensajes.filter((mensaje) => mensaje.id !== idEliminado);
  }
  
  

  

}
