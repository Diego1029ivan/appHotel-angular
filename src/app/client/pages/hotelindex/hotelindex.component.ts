import { Component, OnInit } from '@angular/core';
import { UbicacionesService } from '../../services/ubicaciones.service';
import { Ubicacion } from '../../../interfaces/ubicacion';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotelindex',
  templateUrl: './hotelindex.component.html',
  styleUrls: ['./hotelindex.component.css']
})
export class HotelindexComponent implements OnInit{
  private baseUrl: string = environment.baseUrl;
  ubicaciones:Ubicacion[]=[]
  ngOnInit(): void {
    this.LoadUbicaciones();
  }
  constructor(private ubicacionService:UbicacionesService){}

  LoadUbicaciones(){
    this.ubicacionService.getUbicaciones()
      .subscribe(ubicaciones=>{
        this.ubicaciones=ubicaciones
      });
  }
}
