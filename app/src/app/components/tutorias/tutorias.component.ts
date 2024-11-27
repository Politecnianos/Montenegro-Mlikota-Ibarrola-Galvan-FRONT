import { Component} from '@angular/core';
import { Mensaje } from '../../interfaces/Mensaje';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { CommonModule} from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MensajesService } from '../../services/Mensajes/mensajes.service';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tutorias',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    MensajeComponent,
    RouterLink
  ],
  templateUrl: './tutorias.component.html',
  styleUrl: './tutorias.component.css'
})
export class TutoriasComponent {
  mensajes : Mensaje[] = [];
  idAlumno: number = 0;

  constructor(private msjService : MensajesService, private usuarioService : UserServiceService){}

  ngOnInit(): void {
    this.getMensajes();
    this.obtenerDni();
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

    obtenerDni(): void {
    const mail = localStorage.getItem('mail');
    if (mail) {
      this.usuarioService.getUsuarioDni(mail).subscribe(
        (response) => {
          this.idAlumno = response.dni;
        },
        (error) => {
          console.error('Error al obtener el DNI del usuario:', error);
        }
      );
    } else {
      console.error('Correo no encontrado en localStorage');
    }
  }
  
}
