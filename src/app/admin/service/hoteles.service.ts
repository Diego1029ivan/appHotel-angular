import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hoteles } from '../../interfaces/hoteles';

@Injectable({
  providedIn: 'root',
})
export class HotelesService {
  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/hoteles';

  constructor(private http: HttpClient) {}

  getHoteles(): Observable<Hoteles[]> {
    return this.http.get<Hoteles[]>(`${this.baseUrl}${this.urlEndPoint}`);
  }
  getHotelesOne(id: number): Observable<Hoteles> {
    return this.http.get<Hoteles>(`${this.baseUrl}${this.urlEndPoint}/${id}`);
  }
  getusuarioxhotel(id: number): Observable<Hoteles[]> {
    return this.http
      .get<Hoteles[]>(
        `${this.baseUrl}${this.urlEndPoint}/usuariologeadoxhoteles/${id}`
      )
      .pipe(
        map((response) => response as Hoteles[]),
        catchError((e) => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  createHotel(
    hotel: Hoteles,
    userid: number,
    ubid: number
  ): Observable<Hoteles> {
    return this.http
      .post(
        `${this.baseUrl}${this.urlEndPoint}/user/${userid}/ubicacion/${ubid}`,
        hotel
      )
      .pipe(
        map((response: any) => response.hotel as Hoteles),
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
  updateHotel(hotel: Hoteles, id: number): Observable<Hoteles> {
    return this.http
      .put<Hoteles>(`${this.baseUrl}${this.urlEndPoint}/${id}`, hotel)
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
  updateHotelUbicacion(
    hotel: Hoteles,
    id: number,
    ubicaId: number
  ): Observable<Hoteles> {
    return this.http
      .put<Hoteles>(
        `${this.baseUrl}${this.urlEndPoint}/${id}/ubicacion/${ubicaId}`,
        hotel
      )
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

  subirFotoDHoteles(archivo: File, id): Observable<HttpEvent<{}>> {
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
  deleteHotel(id: number): Observable<Hoteles> {
    return this.http
      .delete<Hoteles>(`${this.baseUrl}${this.urlEndPoint}/${id}`)
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
