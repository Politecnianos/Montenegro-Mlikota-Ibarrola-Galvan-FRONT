import { Component , Input, OnInit} from '@angular/core';
import { Mensaje } from '../../interfaces/Mensaje';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Respuesta } from '../../interfaces/Respuesta';
import { RespuestasService } from '../../services/Respuestas/respuestas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent implements OnInit{
  @Input() mensaje!: Mensaje; 
  nombreUsuario : String = "Cargando...";
  idAlumno : number = 0;
  constructor(private route : ActivatedRoute, private usuarioService : UserServiceService, private respuestasService : RespuestasService){}

  ngOnInit(): void {
    this.getUsuario();
    this.idAlumno = parseInt(this.route.snapshot.params['id'], 10);
  }


  getUsuario(): void {
    this.usuarioService.getUsuario(this.mensaje.dueno).subscribe(response => {
      this.nombreUsuario = response.nombre;
    }, error => {
      console.error("Error al obtener el usuario:", error);
    });
    
  }

  applyForm = new FormGroup({
    contenido: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  submitApplication() {
    if (this.applyForm.valid) { 
      const contenido: string = this.applyForm.value.contenido ?? '';

      const respuestaNueva : Respuesta = {
          id: 0,
          dueno: this.idAlumno,
          rtaMensaje: this.mensaje.id,
          contenido: contenido,
          fecha: new Date, 
      };

      this.respuestasService.agregarRespuesta(respuestaNueva).subscribe(
        response => {
          console.log('Respuesta agregada correctamente:', response);
        },
        error => {
          console.error('Error al agregar respuesta:', error);
        }
      );
      } 
  }
  
}
