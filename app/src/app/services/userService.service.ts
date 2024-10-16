import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/Usuario';
import { Observable } from 'rxjs';
import { aL } from 'vitest/dist/chunks/reporters.C_zwCd4j.js';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private urlApi = 'http://localhost:3000/alumnos';

  constructor(private http: HttpClient) { }

  signIn(alumno : Usuario) : Observable<any>{
    return this.http.post(this.urlApi, alumno);
  }
}
