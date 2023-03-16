import { Component, OnInit } from '@angular/core';
import { Galeria } from 'src/app/interfaces/galeria';

import { environment } from 'src/environments/environment';
import { HotelesService } from '../../services/hoteles.service';

import { Hoteles } from 'src/app/interfaces/hoteles';



@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.component.html',
  styleUrls: ['./regiones.component.css']
})
export class RegionesComponent implements OnInit{

  //public galeria : any =[]
  private baseUrl: string = environment.baseUrl;
  hoteles:Hoteles[]=[]
  hotelesL:Hoteles[]=[]
  hotelesM:Hoteles[]=[]
  hotelesT:Hoteles[]=[]

  galerias:Galeria[]=[]
 
  ngOnInit(): void {
    this.LoadHoteles();
    
    
    
    
  }

  constructor(private hotelesService: HotelesService,
              ){}
  LoadHoteles(){
    this.hotelesService.getHoteles()
      .subscribe( (hoteles) =>{
        this.hoteles=hoteles;
        for(let i = 0 ; i < this.hoteles.length ; i++){
          this.galerias.push(this.hoteles[i].galeria[0])
          
        }

        for(let i = 0 ; i < this.hoteles.length ; i++){
          (this.hoteles[i].ubicacion['ciudad']=='Tarapoto')?this.hotelesT.push(this.hoteles[i]):
          (this.hoteles[i].ubicacion['ciudad']=='Moyobamba')?this.hotelesM.push(this.hoteles[i]):
          (this.hoteles[i].ubicacion['ciudad']=='Lamas')?this.hotelesL.push(this.hoteles[i]):
          false
        }
        
             
      });
      
  }


 
  
}
