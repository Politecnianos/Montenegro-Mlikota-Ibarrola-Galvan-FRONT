import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../interfaces/Usuario';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  router: Router = inject(Router);

  constructor(private alumnosService: UserServiceService) {
  }

  applyForm = new FormGroup({
    dni: new FormControl('', [Validators.required, Validators.minLength(7)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
    apodo: new FormControl('', [Validators.required, Validators.minLength(2)]),
    mail: new FormControl('', [Validators.required, Validators.email]), 
    contrasena: new FormControl('', [Validators.required, Validators.minLength(5)]), 
    contrasenaRep: new FormControl('', [Validators.required, Validators.minLength(5)]),
    orientacion: new FormControl('', Validators.required), 
    curso: new FormControl('', Validators.required) 
  });

 
  submitApplication() {
    if (this.applyForm.valid) { 
      const dni: number = Number(this.applyForm.value.dni ?? NaN);
      if (isNaN(dni)) {
        alert("Ingrese un dni válido")
        return;
      }
      const nombre: string = this.applyForm.value.nombre ?? '';
      const mail: string = this.applyForm.value.mail ?? '';
      const apodo: string = this.applyForm.value.apodo ?? '';
      const contrasena: string = this.applyForm.value.contrasena ?? '';
      const contrasenaRep: string = this.applyForm.value.contrasenaRep ?? '';

      if (contrasena != contrasenaRep) {
        alert("Las contraseñas no coinciden")
        return; 
      }

      if (!mail.endsWith('@ipm.edu.ar')) {
        alert("Debe registrarse con el mail institucional")
        return; 
      }
      
      const orientacion: string = this.applyForm.value.orientacion ?? ''; 
      const curso: string = this.applyForm.value.curso ?? '';

      if (orientacion == "Seleccione su especialidad") {
        alert("Debe seleccionar su especialidad correctamente")
        return; 
      }

      if (curso == "Seleccione su curso") {
        alert("Debe seleccionar su curso correctamente")
        return; 
      }
    
      const alumno : Usuario = {
          dni: dni,
          apodo: apodo,
          nombre: nombre,
          orientacion: orientacion, 
          curso: this.sacarCurso(curso),
          descripcion: "",
          mail: mail,
          contrasena: contrasena,
      };

      console.log(alumno); 

      this.alumnosService.signIn(alumno).subscribe(
        response => {
          console.log('Alumno agregado correctamente:', response);
          alert("Te registraste correctamente. Ya puedes iniciar sesión desde el login")
          this.router.navigateByUrl('')
        },
        error => {
          console.error('Error al agregar alumno:', error);
        }
      );
      
    } else {
      alert("Por favor, verifique los datos ingresados");
    }
  }

  sacarCurso(curso: string): number {
    switch (curso) {
      case "primero": return 1;
      case "segundo": return 2;
      case "tercero": return 3;
      case "cuarto": return 4;
      case "quinto": return 5;
      default: return 6;
    }
  }
}