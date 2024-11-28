import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensaje } from '../../interfaces/Mensaje';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private urlApi = 'http://localhost:3000/mensajes';

  constructor(private http: HttpClient) { }


  getMensajes(page: number = 1, limit: number = 5, seccion: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (seccion) {
      params = params.set('seccion', seccion);
    }

    return this.http.get<any>(this.urlApi, { params });
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


