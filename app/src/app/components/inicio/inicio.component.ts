import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MensajesService } from '../../services/Mensajes/mensajes.service';
import { Mensaje } from '../../interfaces/Mensaje';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  mensajes : Mensaje[] = [];

  constructor(private msjService : MensajesService){}

  ngOnInit(): void {
    this.getMensajes();
  }

  getMensajes(){
    this.msjService.getMensajes().subscribe( data => {
      this.mensajes = data;
    })

  }

}
