import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MensajesService } from '../../services/Mensajes/mensajes.service';
import { Mensaje } from '../../interfaces/Mensaje';
import { CommonModule } from '@angular/common';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    MensajeComponent,
    RouterLink,
    NgxPaginationModule,
 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  mensajes : Mensaje[] = [];
  idAlumno : number = 0;
  egresado: boolean = false;
  public page: number = 1;
  totalMensajes: number = 0;

  constructor(private msjService : MensajesService, private usuarioService : UserServiceService){}

  ngOnInit(): void {
    this.getMensajes();
    this.getUsuarioDueno();
  }


  getMensajes(): void {
    const seccion = 'Eventos'; 
    this.msjService.getMensajes(this.page, 5, seccion).subscribe((response) => {
      if (response) {
        console.log("aaaaaa", response)
        this.mensajes = response.mensajes;
        this.totalMensajes = response.totalMensajes;
        console.log("aaaaaaT", response.totalMensajes)
        console.log("Total de mensajes en la respuesta:", this.totalMensajes);
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
  
  
  onPageChange(page: number): void {
    console.log("AAAA")
    console.log("Página cambiada:", page);
    console.log("Total de mensajes:", this.totalMensajes);
    console.log("Tamaño de página:", 5);
  
    this.page = page;
    this.getMensajes();
  }

}
