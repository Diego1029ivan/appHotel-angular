import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/usuarios';

  constructor(private http: HttpClient, private router: Router) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}${this.urlEndPoint}`).pipe(
      catchError((e) => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['auth/login']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
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
    return this.http.post(`${this.baseUrl}/api/usuariosAdmin`, usuario).pipe(
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
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http
      .put(`${this.baseUrl}${this.urlEndPoint}/${usuario.id}`, usuario)
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
  deleteUsuario(id: number): Observable<Usuario> {
    return this.http
      .delete<Usuario>(`${this.baseUrl}${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }
}
