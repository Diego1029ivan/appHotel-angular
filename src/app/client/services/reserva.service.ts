import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from '../../interfaces/reserva';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) {}

  crearReserva(reserva: Reserva,idhotel:number,idusuario:number): Observable<Reserva> {
    return this.http.post(`${this.baseUrl}/api/reserva/user/${idusuario}/hote/${idhotel}`, reserva).pipe(
      map((response: any) => response.reserva as Reserva),
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
