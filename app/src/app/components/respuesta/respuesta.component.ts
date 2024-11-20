import { Component, OnInit } from '@angular/core';
import { Respuesta } from '../../interfaces/Respuesta';
import { Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserServiceService } from '../../services/Usuarios/userService.service';

@Component({
  selector: 'app-respuesta',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './respuesta.component.html',
  styleUrl: './respuesta.component.css'
})
export class RespuestaComponent implements OnInit{
  @Input() respuesta!: Respuesta;
  nombreUsuario : String = "Cargando...";

  constructor(private usuarioService : UserServiceService){}

  ngOnInit(): void {
    this.getUsuario();
  }


  getUsuario(): void {
    this.usuarioService.getUsuario(this.respuesta.dueno).subscribe(response => {
      this.nombreUsuario = response.nombre;
    }, error => {
      console.error("Error al obtener el usuario:", error);
    });
    
  }

}
