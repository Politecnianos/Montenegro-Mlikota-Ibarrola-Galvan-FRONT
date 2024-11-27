import { Component, Input, OnInit } from '@angular/core';
import { Mensaje } from '../../interfaces/Mensaje';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Respuesta } from '../../interfaces/Respuesta';
import { RespuestasService } from '../../services/Respuestas/respuestas.service';
import { ActivatedRoute } from '@angular/router';
import { RespuestaComponent } from '../respuesta/respuesta.component';
import { MensajesService } from '../../services/Mensajes/mensajes.service';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RespuestaComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  @Input() mensaje!: Mensaje;
  nombreUsuario: String = "Cargando...";
  idAlumno: number = 0;
  respuestas: Respuesta[] = [];
  egresado: boolean = false;

  mensajeEditado: String = '';
  editando: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UserServiceService,
    private respuestasService: RespuestasService,
    private mensajesService : MensajesService
  ) {}

  ngOnInit(): void {
    this.getUsuario();
    this.getUsuarioDueno();
    this.obtenerRespuestas();
  }


  getUsuario(): void {
    this.usuarioService.getUsuario(this.mensaje.dueno).subscribe(
      (response) => {
        this.nombreUsuario = response.nombre;
      },
      (error) => {
        console.error("Error al obtener el usuario:", error);
      }
    );
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

    let fecha = new Date().getFullYear;
    const digitos = fecha.toString().slice(-2);

    if(localStorage.getItem('mail')?.includes(digitos)){
      this.egresado = true;
      console.log("es egresadoooo")
    }
  }

  applyForm = new FormGroup({
    contenido: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  submitApplication() {
    if (this.applyForm.valid) {
      const contenido: string = this.applyForm.value.contenido ?? '';
      const mail = localStorage.getItem('mail');
  
      if (mail) {
        this.usuarioService.getUsuarioDni(mail).subscribe(
          (response) => {
            this.idAlumno = response.dni;
  
            const respuestaNueva: Respuesta = {
              id: 0,
              dueno: this.idAlumno,
              rtaMensaje: this.mensaje.id,
              contenido: contenido,
              fecha: new Date(),
            };
  
            this.respuestasService.agregarRespuesta(respuestaNueva).subscribe(
              (response) => {
                console.log('Respuesta agregada correctamente:', response);
                this.respuestas.push(response);
              },
              (error) => {
                console.error('Error al agregar respuesta:', error);
              }
            );
          },
          (error) => {
            console.error("Error al obtener el usuario:", error);
            alert("No se pudo obtener el ID del usuario.");
          }
        );
      } else {
        console.error("No se encontró el correo en localStorage.");
        alert("Debe iniciar sesión primero.");
      }
    } else {
      alert("El formulario no es válido. Por favor, verifique los datos ingresados.");
    }
    this.applyForm.reset();
  }
  
  obtenerRespuestas() {
    this.respuestasService.getRespuestas().subscribe(
      (response) => {
        this.respuestas = response.filter(
          (respuesta) => respuesta.rtaMensaje === this.mensaje.id
        );
        console.log(response);
      },
      (error) => {
        console.error('Error al obtener respuestas:', error);
      }
    );
  }

  habilitarEdicion(): void {
    this.mensajeEditado = this.mensaje.contenido; 
    this.editando = true;
  }
  
  guardarEdicion(): void {
    if (this.mensajeEditado.trim()) {
      const mensajeActualizado = { ...this.mensaje, contenido: this.mensajeEditado };
      this.mensajesService.actualizarMensaje(mensajeActualizado).subscribe(
        (response) => {
          this.mensaje.contenido = this.mensajeEditado;
          this.editando = false;
        },
        (error) => {
          console.error('Error al actualizar el mensaje:', error);
        }
      );
    } else {
      alert('El mensaje no puede estar vacío.');
    }
  }

  cancelarEdicion(): void {
    this.editando = false; 
    this.mensajeEditado = '';
  }

}



