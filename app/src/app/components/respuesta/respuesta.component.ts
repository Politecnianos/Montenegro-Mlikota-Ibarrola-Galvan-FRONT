import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Respuesta } from '../../interfaces/Respuesta';
import { Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { RespuestasService } from '../../services/Respuestas/respuestas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-respuesta',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './respuesta.component.html',
  styleUrl: './respuesta.component.css'
})
export class RespuestaComponent implements OnInit{
  @Input() respuesta!: Respuesta;
  nombreUsuario : String = "Cargando...";
  egresado: boolean = false;
  idUsuarioSesion : number =0;

  respuestaEditada: String = '';
  editando: boolean = false; 

  @Output() respuestaEliminada = new EventEmitter<number>();

  constructor(private usuarioService : UserServiceService, private respuestasService : RespuestasService){}

  ngOnInit(): void {
    this.getUsuario();
    this.getUsuarioDueno();
  }


  getUsuario(): void {
    this.usuarioService.getUsuario(this.respuesta.dueno).subscribe(response => {
      this.nombreUsuario = response.nombre;
    }, error => {
      console.error("Error al obtener el usuario:", error);
    });
  }

  getUsuarioDueno(): void {
    const mail = localStorage.getItem('mail');
    if (mail) {
      this.usuarioService.getUsuarioDni(mail).subscribe(
        (response) => {
          this.idUsuarioSesion = response.dni;
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

  habilitarEdicion(): void {
    this.respuestaEditada = this.respuesta.contenido; 
    this.editando = true;
  }
  
  guardarEdicion(): void {
    if (this.respuestaEditada.trim()) {
      const respuestaActualizado = { ...this.respuesta, contenido: this.respuestaEditada };
      this.respuestasService.actualizarRespuesta(respuestaActualizado).subscribe(
        (response) => {
          this.respuesta.contenido = this.respuestaEditada;
          this.editando = false;
        },
        (error) => {
          console.error('Error al actualizar el respuesta:', error);
        }
      );
    } else {
      alert('La respuesta no puede estar vacía.');
    }
  }

  cancelarEdicion(): void {
    this.editando = false; 
    this.respuestaEditada = '';
  }

  eliminarMensaje(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este respuesta?')) {
      this.respuestasService.eliminarRespuesta(this.respuesta.id).subscribe(
        (response) => {
          console.log('Respuesta eliminada correctamente:', response);
          this.respuestaEliminada.emit(this.respuesta.id);
        },
        (error) => {
          console.error('Error al eliminar la respuesta:', error);
          alert('Hubo un error al intentar eliminar la respuesta.');
        }
      );
    }
  }
}
