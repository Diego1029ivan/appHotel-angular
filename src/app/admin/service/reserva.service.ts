import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from 'src/app/interfaces/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/reserva';
  constructor(private http: HttpClient) {}

  getReservaxHotel(idHotel: number): Observable<Reserva[]> {
    return this.http
      .get<Reserva[]>(`${this.baseUrl}${this.urlEndPoint}/hotel/${idHotel}`)
      .pipe(
        catchError((e) => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }
  updateReserva(idReserva: number, reserva: Reserva): Observable<Reserva> {
    return this.http
      .put<Reserva>(`${this.baseUrl}${this.urlEndPoint}/${idReserva}`, reserva)
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
