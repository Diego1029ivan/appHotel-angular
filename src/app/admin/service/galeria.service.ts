import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Galeria } from 'src/app/interfaces/galeria';

@Injectable({
  providedIn: 'root',
})
export class GaleriaService {
  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/galeria';
  constructor(private http: HttpClient) {}
  getGaleriaOne(id: number): Observable<Galeria> {
    return this.http
      .get<Galeria>(`${this.baseUrl}${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  crearGaleria(galeria: Galeria, idHotel: number): Observable<Galeria> {
    return this.http
      .post(`${this.baseUrl}${this.urlEndPoint}/hotel/${idHotel}`, galeria)
      .pipe(
        map((response: any) => response.galeria as Galeria),
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

  subirFotoGaleriatriple(
    archivo: File,
    archivo2: File,
    archivo3: File,
    id
  ): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    formData.append('archivo2', archivo2);
    formData.append('archivo3', archivo3);

    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}${this.urlEndPoint}/uploadfoto33`,
      formData,
      {
        reportProgress: true,
      }
    );
    return this.http.request(req);
  }
  subirFotoGaleria(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}${this.urlEndPoint}/uploadfoto1`,
      formData,
      {
        reportProgress: true,
      }
    );
    return this.http.request(req);
  }

  subirFotoGaleria2(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}${this.urlEndPoint}/uploadfoto2`,
      formData,
      {
        reportProgress: true,
      }
    );
    return this.http.request(req);
  }
  subirFotoGaleria3(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}${this.urlEndPoint}/uploadfoto3`,
      formData,
      {
        reportProgress: true,
      }
    );
    return this.http.request(req);
  }
  updateGaleria(
    id: number,
    galeria: Galeria,
    idHotel: number
  ): Observable<Galeria> {
    return this.http
      .put(`${this.baseUrl}${this.urlEndPoint}/${id}/hotel/${idHotel}`, galeria)
      .pipe(
        map((response: any) => response.galeria as Galeria),
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
