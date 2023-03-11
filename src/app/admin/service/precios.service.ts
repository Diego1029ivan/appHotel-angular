import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Precioxtipohabitacion } from 'src/app/interfaces/precioxtipohabitacion';

@Injectable({
  providedIn: 'root',
})
export class PreciosService {
  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/tipoHabitacion';
  constructor(private http: HttpClient) {}
  getPrecioOne(id: number): Observable<Precioxtipohabitacion> {
    return this.http
      .get<Precioxtipohabitacion>(`${this.baseUrl}${this.urlEndPoint}/${id}}`)
      .pipe(
        catchError((e) => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }
  crearPrecio(
    precio: Precioxtipohabitacion,
    idHotel: number
  ): Observable<Precioxtipohabitacion> {
    return this.http
      .post(`${this.baseUrl}${this.urlEndPoint}/hotel/${idHotel}`, precio)
      .pipe(
        map((response: any) => response.precio as Precioxtipohabitacion),
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
  updatePrecio(
    precio: Precioxtipohabitacion,
    idHotel: number
  ): Observable<Precioxtipohabitacion> {
    return this.http
      .put(`${this.baseUrl}${this.urlEndPoint}/hotel/${idHotel}`, precio)
      .pipe(
        map((response: any) => response.precio as Precioxtipohabitacion),
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
