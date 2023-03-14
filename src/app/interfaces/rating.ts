import { Hoteles } from "./hoteles";
import { Usuario } from "./usuario";

export interface Rating {
    
    clasificacion: number | null;
    detalle:        String
    hotel?:         Hoteles;
    usuario?:       Usuario;
}