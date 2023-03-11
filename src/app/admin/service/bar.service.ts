import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bares } from 'src/app/interfaces/bares';

@Injectable({
  providedIn: 'root',
})
export class BarService {
  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/bar';
  constructor(private http: HttpClient) {}
  getOneBar(id: number): Observable<Bares> {
    return this.http
      .get<Bares>(`${this.baseUrl}${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }
  crearBar(bar: Bares, idHotel: number): Observable<Bares> {
    return this.http
      .post(`${this.baseUrl}${this.urlEndPoint}/hotel/${idHotel}`, bar)
      .pipe(
        map((response: any) => response.bar as Bares),
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
  subirFotoBar(archivo: File, id): Observable<HttpEvent<{}>> {
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
  updateBar(bar: Bares, idHotel: number): Observable<Bares> {
    return this.http
      .put(`${this.baseUrl}${this.urlEndPoint}/hotel/${idHotel}`, bar)
      .pipe(
        map((response: any) => response.bar as Bares),
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
