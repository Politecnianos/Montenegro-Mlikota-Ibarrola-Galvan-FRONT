import { Component, Input, OnInit } from '@angular/core';
import { Mensaje } from '../../interfaces/Mensaje';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Respuesta } from '../../interfaces/Respuesta';
import { RespuestasService } from '../../services/Respuestas/respuestas.service';
import { ActivatedRoute } from '@angular/router';
import { RespuestaComponent } from '../respuesta/respuesta.component';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RespuestaComponent,
    CommonModule
  ],
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  @Input() mensaje!: Mensaje;
  nombreUsuario: String = "Cargando...";
  idAlumno: number = 0;
  respuestas: Respuesta[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UserServiceService,
    private respuestasService: RespuestasService
  ) {}

  ngOnInit(): void {
    this.getUsuario();
    this.idAlumno = parseInt(this.route.snapshot.params['id'], 10);
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

  applyForm = new FormGroup({
    contenido: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  submitApplication() {
    if (this.applyForm.valid) {
      const contenido: string = this.applyForm.value.contenido ?? '';

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
}
