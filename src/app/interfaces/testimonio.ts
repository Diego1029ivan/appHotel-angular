import { Usuario } from "./usuario";

export interface Testimonio {
    
    detalle_testimonio: string;
    estado:             1;
    usuario?:          Usuario;
    fecha:              Date;
}