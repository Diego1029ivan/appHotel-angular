import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }
  
  saveToken(){
    return localStorage.getItem("ACCESS_TOKEN")
    
}
  getReportePorId(id:string){
    
    
    const headers = new HttpHeaders({
      
      'Content-Type':'application/json',
      //'Accept':'application/pdf'


    })


    return this.http.get<any>(`${this.baseUrl}/reporte/reservas/usuario?idUser=${id}&tipo=PDF`,{headers,responseType:'blob' as 'json'})
    .pipe(
      catchError((e) => {
        if (e.error) {
          console.error(e.error);
        }
        return throwError(e);
      })
    );
  }

  getEmail(correo:string,nombre:string,celular:string,asunto:string) {
    return this.http.get(`${this.baseUrl}/reporte/email/${correo}/${nombre}/${asunto}/cel/${celular}`)
          .pipe(
            catchError((e) => {
              if (e.error) {
                console.error(e.error);
              }
              return throwError(e);
            })
          );
  }
}
