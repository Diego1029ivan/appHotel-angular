import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rating } from '../../interfaces/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) {}

  getRating(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.baseUrl}/api/rating`);
  }

  crearRating(rating: Rating,idusuario:number,idhotel:number): Observable<Rating> {
    return this.http.post(`${this.baseUrl}/api/rating/user/${idusuario}/hotel/${idhotel}`, rating).pipe(
      map((response: any) => response.rating as Rating),
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
