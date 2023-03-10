import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Reserva } from 'src/app/interfaces/reserva';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReservaService } from '../../services/reserva.service';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit{
  public userlogeado: Usuario;
  constructor(private reservaService:ReservaService,
    public authService: AuthService, private router: Router,
    private reporteService:ReportesService,
    ){
     
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
this.refreshReservas()
        // this.reservaParcial = this.reservasUser.map((reservasUser, i) => ({ counter: i + 1, ...reservasUser })).slice(
        //   (this.page - 1) * this.pageSize,
        //   (this.page - 1) * this.pageSize + this.pageSize,
        // );
      });
      
  }

  refreshReservas() {
    this.reservaParcial = this.reservasUser.map((reservasUser, i) => ({ counter: i + 1, ...reservasUser })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
    console.log(this.reservaParcial) 
		
	}

  /****PRUEBA REPORTE */
  mostrarReporte(id:string):void{
    console.log('Pueba de descarga')
    const fileName =`reporte_${Math.random()}.pdf`
    this.reporteService.getReportePorId(id).subscribe((response:any)=>{
     this.pruebaPDF(response,fileName)
     console.log(response)
     
    },
    (error:any)=>{
    console.log(error)})
  }

  pruebaPDF(response:any, fileName:string):void{
    
    
    const dataType = response.type
    const binaryData=[]
    binaryData.push(response)
    console.log(binaryData)

    const filePath=window.URL.createObjectURL(new Blob(binaryData,{type:dataType}));
    const downloadlink=document.createElement('a');
    downloadlink.href=filePath;
    downloadlink.setAttribute('download',fileName);
    document.body.appendChild(downloadlink);
    downloadlink.click();
  }

  
  /**** */
}
