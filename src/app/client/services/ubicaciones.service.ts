import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ubicacion } from '../../interfaces/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/ubicacion';
  constructor(private http: HttpClient) { }

  getUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(`${this.baseUrl}${this.urlEndPoint}`);
  }
}
