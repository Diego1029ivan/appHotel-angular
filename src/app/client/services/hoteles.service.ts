import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hoteles } from 'src/app/interfaces/hoteles';
import { environment } from 'src/environments/environment';
import { ReqResResponse } from '../models/reqres-response';



@Injectable({
  providedIn: 'root'
})
export class HotelesService {

  private baseUrl: string = environment.baseUrl;
  private urlEndPoint: string = '/api/hoteles';
  constructor(private http: HttpClient) { }

  getHoteles() {
    return this.http.get<Hoteles[]>(`${this.baseUrl}${this.urlEndPoint}`);
    //return this.http.get<Hoteles[]>(`${this.baseUrl}${this.urlEndPoint}`);
  }

  getHotelPorId(id:string):Observable<Hoteles>{
    return this.http.get<Hoteles>(`${this.baseUrl}${this.urlEndPoint}/${id}`)
  }

  


  
}
