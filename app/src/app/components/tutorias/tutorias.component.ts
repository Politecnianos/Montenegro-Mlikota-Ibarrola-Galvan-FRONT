import { Component} from '@angular/core';
import { Mensaje } from '../../interfaces/Mensaje';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { CommonModule} from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MensajesService } from '../../services/Mensajes/mensajes.service';
import { MensajeComponent } from '../mensaje/mensaje.component';

@Component({
  selector: 'app-tutorias',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    MensajeComponent
  ],
  templateUrl: './tutorias.component.html',
  styleUrl: './tutorias.component.css'
})
export class TutoriasComponent {
  mensajes : Mensaje[] = [];

  constructor(private msjService : MensajesService, private usuarioService : UserServiceService){}

  ngOnInit(): void {
    this.getMensajes();
  }


  getMensajes(): void {
    this.msjService.getMensajes().subscribe(response => {
      if (response) {
        this.mensajes = response;
        this.mensajes = this.mensajes.filter(mensaje => mensaje.seccion === 'Tutorias');
      } else {
        console.error('Error: No se pudo obtener la lista de mensajes');
      }
    });
  }
  
}
