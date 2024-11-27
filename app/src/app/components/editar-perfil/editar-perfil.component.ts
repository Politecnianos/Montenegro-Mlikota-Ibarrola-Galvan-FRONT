import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/Usuarios/userService.service';
import { Usuario } from '../../interfaces/Usuario';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit{
  idAlumno : number = 0;
  alumno : Usuario | undefined;
  alumnoForm!: FormGroup;

  constructor(
    private usuarioService: UserServiceService, private router : Router
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario(): void {
    const mail = localStorage.getItem('mail');
    if (mail) {
      this.usuarioService.getUsuarioDni(mail).subscribe(
        (response) => {
          this.idAlumno =response.dni;
          this.usuarioService.getUsuario(this.idAlumno).subscribe(
            (usuario) => {
              this.alumno = usuario;
              console.log("Usuario completo:", usuario); 
              this.initForm();
          }, (error) => {
            console.error('Error al obtener usuario', error)
          })
        },
        (error) => {
          console.error('Error al obtener usuario:', error);
        }
      );
    } else {
      console.error('Correo no encontrado en localStorage');
    }
  }

  initForm(): void {
    if (this.alumno) {
      this.alumnoForm = new FormGroup({
        apodo: new FormControl(this.alumno.apodo),
        descripcion: new FormControl(this.alumno.descripcion),
        curso: new FormControl(this.alumno.curso),
        orientacion: new FormControl(this.alumno.orientacion),
      });
    }
  }

  onSubmit(): void {
    const apodo = this.alumnoForm.value.apodo ?? '';
    const descripcion = this.alumnoForm.value.descripcion ?? '';
    const curso = this.alumnoForm.value.curso ?? '';
    const orientacion = this.alumnoForm.value.orientacion ?? '';

    const alumnoNuevo: Usuario = {
      dni: this.alumno?.dni ?? 0,
      apodo: apodo,
      nombre: this.alumno?.nombre ?? '', 
      orientacion: orientacion,
      curso: curso,
      descripcion: descripcion,
      mail: this.alumno?.mail  ?? '',
      contrasena: this.alumno?.contrasena ?? ''
    };

   
    this.usuarioService.updateAlumno(alumnoNuevo).subscribe(
      (response) => {
        alert('Datos del alumno actualizados correctamente.');
        this.router.navigateByUrl('/Eventos');
        
      },
      (error) => {
        console.error('Error al actualizar los datos del alumno:', error);
      }
    );
  }
}


