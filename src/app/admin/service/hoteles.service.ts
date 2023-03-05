import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, filter } from 'rxjs/operators';
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
