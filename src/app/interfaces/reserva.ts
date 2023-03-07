import { Hoteles } from "./hoteles";
import { Tipohab } from "./Tipohab";
import { TipoPago } from "./TipoPago";
import { Usuario } from "./usuario";

export class Reserva {
    
    fechaEntrada:     Date;
    fechaSalida:      Date;
    adelantoReservas: number;
    estado:           1;
    cantidadHab:      number;
    hotel?:            Hoteles;
    usuario?:          Usuario;
    tipoPago:         TipoPago;
    tipohab:          Tipohab;
}