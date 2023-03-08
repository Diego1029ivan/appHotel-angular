import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Reserva } from 'src/app/interfaces/reserva';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit{
  public userlogeado: Usuario;
  constructor(private reservaService:ReservaService,
    public authService: AuthService, private router: Router,){
     
    this.userlogeado = new Usuario();
  }
  ngOnInit(): void {
    this.user=this.authService.usuario;
    this.LoadReservas();
  
  }
  
  page:number
  pageSize:number
  collectionSize:number
  reservas:Reserva[]=[];
  reservasUser:Reserva[]=[];
  reservaParcial:Reserva[]=[]
  user:Usuario

  LoadReservas(){
    console.log('Cargando reservas')
    this.reservaService.getReserva()
      .subscribe( (reserva) =>{
        this.reservas=reserva;
       //console.log(this.reservas)      
        this.page = 1;
        this.pageSize = 4;
        
        for(let i = 0 ; i < this.reservas.length ; i++){
          (this.reservas[i].usuario.id==this.user.id)?this.reservasUser.push(this.reservas[i]):
          false
        }
        //console.log(this.reservasUser)
        this.collectionSize = this.reservasUser.length;

        this.reservaParcial = this.reservasUser.map((reservasUser, i) => ({ counter: i + 1, ...reservasUser })).slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize,
        );
      });
      
  }

  refreshReservas() {
    this.reservaParcial = this.reservasUser.map((reservasUser, i) => ({ counter: i + 1, ...reservasUser })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
    console.log(this.reservaParcial) 
		
	}
  
}
