import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { MensajesService } from '../../services/Mensajes/mensajes.service';
import { Mensaje } from '../../interfaces/Mensaje';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-mensaje',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavbarComponent,
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './crear-mensaje.component.html',
  styleUrl: './crear-mensaje.component.css'
})
export class CrearMensajeComponent implements OnInit{

  idAlumno: number = 0;
  egresado: boolean = false;

  constructor(
    private usuarioService: UserServiceService,
    private mensajesService: MensajesService,
    private router: Router
  ) {}

  ngOnInit(){
    this.obtenerDni();
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

    let fecha = new Date().getFullYear();
    let digitos = fecha.toString().slice(-2);

    if(localStorage.getItem('mail')?.includes(digitos)){
      this.egresado = true;
      console.log("es egresadoooo")
    }
  }

  applyForm = new FormGroup({
    contenido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    seccion: new FormControl('', Validators.required) 
  });

  sacarSeccion(seccion: string): string {
    switch (seccion) {
      case "Tutorías": return "Tutorias";
      default: return "Eventos";
    }
  }

  submitApplication() {
    if (this.applyForm.valid) {
      const contenido: string = this.applyForm.value.contenido ?? '';
      const seccion: string = this.applyForm.value.seccion ?? '';
  
      const mensajeNuevo: Mensaje = {
        id: 0,
        dueno: this.idAlumno,
        contenido: contenido,
        fecha: new Date(),
        seccion : this.sacarSeccion(seccion)
      };

      
      this.mensajesService.agregarMensaje(mensajeNuevo).subscribe(
        (response) => {
          console.log('Mensaje agregado correctamente:', response);
          this.router.navigate([this.sacarSeccion(seccion)]);
        },
        (error) => {
          console.error('Error al agregar mensaje:', error);
        });
    }
  }
  
}
