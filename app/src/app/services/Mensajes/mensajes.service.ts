import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensaje } from '../../interfaces/Mensaje';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private urlApi = 'http://localhost:3000/mensajes';

  constructor(private http: HttpClient) { }

  getMensajes() : Observable <Mensaje[]>{
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Mensaje[]>(this.urlApi);
  }

  agregarMensaje(mensaje : Mensaje) : Observable<any>{
    return this.http.post(this.urlApi, mensaje);
  }

  actualizarMensaje(mensaje: Mensaje): Observable<Mensaje> {
    return this.http.put<Mensaje>(`${this.urlApi}/${mensaje.id}`, mensaje);
  }

  eliminarMensaje(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`);
  }
  
}


