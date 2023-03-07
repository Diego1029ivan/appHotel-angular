import { Hoteles } from "./hoteles";

export class Tipohab {
    id:             number;
    tipoHabitacion?: string;
    precio?:         number;
    cantidad?:       number;
    hotel?:         Array<Hoteles>=[];
}