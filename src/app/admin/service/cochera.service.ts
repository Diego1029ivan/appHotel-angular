import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cocheras } from 'src/app/interfaces/cocheras';

@Injectable({
  providedIn: 'root',
})
export class CocheraService {
  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/cochera';
  constructor(private http: HttpClient) {}

  getCocheraOne(id: number): Observable<Cocheras> {
    return this.http
      .get<Cocheras>(`${this.baseUrl}${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  crearCochera(cochera: Cocheras, idHotel: number): Observable<Cocheras> {
    return this.http
      .post(`${this.baseUrl}${this.urlEndPoint}/hotel/${idHotel}`, cochera)
      .pipe(
        map((response: any) => response.cochera as Cocheras),
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

  subirFotoCochera(archivo: File, id): Observable<HttpEvent<{}>> {
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
  updateCochera(cochera: Cocheras, idHotel: number): Observable<Cocheras> {
    return this.http
      .put(`${this.baseUrl}${this.urlEndPoint}/hotel/${idHotel}`, cochera)
      .pipe(
        map((response: any) => response.cochera as Cocheras),
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
