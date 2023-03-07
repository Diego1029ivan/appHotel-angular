export interface ReqResResponse {
    id:                    number;
    nombre:                string;
    ruc:                   number;
    logo:                  string;
    cantidadHabitacion:    number;
    descripcionHotel:      string;
    estadoHotel:           number;
    usuario:               Usuario;
    ubicacion:             Ubicacion;
    bares:                 Bare[];
    cocheras:              Cochera[];
    piscinas:              Piscina[];
    galeria:               Galeria[];
    precioxtipohabitacion: Precioxtipohabitacion[];
}

 interface Bare {
    id:             number;
    nombrebar:      null;
    descripcionBar: string;
    fotoBar:        string;
}

 interface Cochera {
    id:                 number;
    descripcionCochera: string;
    fotoCochera:        string;
}

 interface Galeria {
    id:          number;
    foto:        string;
    foto2:       string;
    foto3:       string;
    descripcion: string;
}

 interface Piscina {
    id:                number;
    precioPicina:      number;
    horarioInicio:     string;
    horarioCierre:     string;
    descripcionPicina: string;
    fotoPicina:        string;
}

 interface Precioxtipohabitacion {
    id:             number;
    tipoHabitacion: TipoHabitacion;
    precio:         number;
    cantidad:       number;
}

 enum TipoHabitacion {
    Doble = "Doble",
    Matrimonial = "Matrimonial",
    Simple = "Simple",
}

 interface Ubicacion {
    id:                number;
    pais:              string;
    departamento:      string;
    ciudad:            string;
    descripcionCiudad: string;
    fotoCiudad:        string;
}

 interface Usuario {
    id:       number;
    username: string;
    nombre:   string;
    apellido: string;
    email:    string;
    celular:  number;
    password: string;
    enabled:  boolean;
    estado:   number;
    roles:    Role[];
}

 interface Role {
    id:        number;
    nombreRol: string;
}
