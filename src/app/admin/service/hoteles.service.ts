import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
