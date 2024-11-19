import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuesta } from '../../interfaces/Respuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  private urlApi = 'http://localhost:3000/respuestas';

  constructor(private http: HttpClient) { }

  agregarRespuesta(respuesta : Respuesta): Observable<any>{
    return this.http.post(this.urlApi, respuesta);
  }


}
