import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Piscinas } from 'src/app/interfaces/piscinas';

@Injectable({
  providedIn: 'root',
})
export class PicinaService {
  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/picina';
  constructor(private http: HttpClient) {}

  getPicinaOne(id: number): Observable<Piscinas> {
    return this.http
      .get<Piscinas>(`${this.baseUrl}${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }
  crearPicina(picina: Piscinas, idHotel: number): Observable<Piscinas> {
    return this.http
      .post(`${this.baseUrl}${this.urlEndPoint}/hotel/${idHotel}`, picina)
      .pipe(
        map((response: any) => response.picina as Piscinas),
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
  updatePicina(
    id: number,
    picina: Piscinas,
    idHotel: number
  ): Observable<Piscinas> {
    return this.http
      .put(`${this.baseUrl}${this.urlEndPoint}/${id}/hotel/${idHotel}`, picina)
      .pipe(
        map((response: any) => response.picina as Piscinas),
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
  subirFotoPicina(archivo: File, id: number): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id.toString());
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
}
