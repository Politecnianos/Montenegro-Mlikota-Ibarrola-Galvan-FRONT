import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MensajesService } from '../../services/Mensajes/mensajes.service';
import { Mensaje } from '../../interfaces/Mensaje';
import { CommonModule } from '@angular/common';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    MensajeComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  mensajes : Mensaje[] = [];

  constructor(private msjService : MensajesService, private usuarioService : UserServiceService){}

  ngOnInit(): void {
    this.getMensajes();
  }


  getMensajes(): void {
    this.msjService.getMensajes().subscribe(response => {
      if (response) {
        this.mensajes = response;
        this.mensajes = this.mensajes.filter(mensaje => mensaje.seccion === 'Eventos');
      } else {
        console.error('Error: No se pudo obtener la lista de mensajes');
      }
    });
  }

  

  

}
