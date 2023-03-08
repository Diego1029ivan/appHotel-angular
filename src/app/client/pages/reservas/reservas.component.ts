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
    this.refreshReservas()
    this.userlogeado = new Usuario();
  }
  ngOnInit(): void {
    this.LoadReservas();
    this.user=this.authService.usuario;
    this.reservasUser 
    
    
  }
  
  page:number
  pageSize:number
  collectionSize:number
  reservas:Reserva[]=[];
  reservasUser:Reserva[]=[];
  reservaParcial:Reserva[]=[]
  user:Usuario

  LoadReservas(){
    this.reservaService.getReserva()
      .subscribe( (reserva) =>{
        this.reservas=reserva;
       console.log(this.reservas)      
        this.page = 1;
        this.pageSize = 4;
        
        for(let i = 0 ; i < this.reservas.length ; i++){
          (this.reservas[i].usuario.id==this.user.id)?this.reservasUser.push(this.reservas[i]):
          false
        }
        console.log(this.reservasUser)
        this.collectionSize = this.reservasUser.length;
      });
      
  }

  refreshReservas() {
    this.reservaParcial = this.reservasUser.map((reservasUser, i) => ({ id: i + 1, ...reservasUser })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
		
	}
  
}
