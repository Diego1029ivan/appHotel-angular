import { Precioxtipohabitacion } from './precioxtipohabitacion';
import { Galeria } from './galeria';
import { Usuario } from './usuario';
import { Bares } from './bares';
import { Cocheras } from './cocheras';
import { Piscinas } from './piscinas';
import { Ubicacion } from './ubicacion';

export class Hoteles {
  id: number = 0;
  nombre: string = '';
  ruc: number = 0;
  logo: string = '';
  cantidadHabitacion: number = 0;
  descripcionHotel: string = '';
  usuario: Usuario;
  bares: Array<Bares> = [];
  cocheras: Array<Cocheras> = [];
  piscinas: Array<Piscinas> = [];
  galeria: Array<Galeria> = [];
  ubicacion: Array<Ubicacion> = [];
  precioxtipohabitacion: Array<Precioxtipohabitacion> = [];
}
