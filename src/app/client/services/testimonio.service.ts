import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable,catchError, throwError } from 'rxjs';
import { Testimonio } from 'src/app/interfaces/testimonio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimonioService {

  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) {}

  getTestimonio(): Observable<Testimonio[]> {
    return this.http.get<Testimonio[]>(`${this.baseUrl}/api/testimonio`);
  }

  crearTestimonio(testimonio: Testimonio,idusuario:number): Observable<Testimonio> {
    return this.http.post(`${this.baseUrl}/api/testimonio/user/${idusuario}`, testimonio).pipe(
      map((response: any) => response.testimonio as Testimonio),
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
