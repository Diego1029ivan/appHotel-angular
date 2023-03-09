import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ubicacion } from '../../interfaces/ubicacion';

@Injectable({
  providedIn: 'root',
})
export class RefenciaDUbicacionService {
  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/ubicacion';

  constructor(private http: HttpClient) {}

  getRefenciaDUbicacion(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(`${this.baseUrl}${this.urlEndPoint}`);
  }
  getRefenciaDUbicacionOne(id: number): Observable<Ubicacion> {
    return this.http
      .get<Ubicacion>(`${this.baseUrl}${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }
  crearteRefereciaDUbicacion(ubicacion: Ubicacion): Observable<Ubicacion> {
    return this.http.post(`${this.baseUrl}${this.urlEndPoint}`, ubicacion).pipe(
      map((response: any) => response.ubicacion as Ubicacion),
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
  subirFotoRefereciaDUbicacion(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}${this.urlEndPoint}/upload`,
      formData,
      {
        reportProgress: true,
      }
    );
    return this.http.request(req);
  }

  updateRefereciaDUbicacion(
    ubicacion: Ubicacion,
    id: number
  ): Observable<Ubicacion> {
    return this.http
      .put<Ubicacion>(`${this.baseUrl}${this.urlEndPoint}/${id}`, ubicacion)
      .pipe(
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
