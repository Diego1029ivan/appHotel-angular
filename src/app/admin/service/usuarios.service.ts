import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/usuarios';
  private urlEndPointAdmin: string = '/api/usuariosAdmin';
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}${this.urlEndPoint}`);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}${this.urlEndPoint}/${id}`);
  }

  crearteClient(usuario: Usuario): Observable<Usuario> {
    return this.http.post(`${this.baseUrl}${this.urlEndPoint}`, usuario).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  crearteAdmin(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post(`${this.baseUrl}${this.urlEndPointAdmin}`, usuario)
      .pipe(
        map((response: any) => response.usuario as Usuario),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }
}
