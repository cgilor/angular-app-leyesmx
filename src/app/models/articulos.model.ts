import { Ley } from './ley.model';

interface _ArticuloUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Articulo {

    constructor(
        public nombre: string,
        public _id?: string,
        public cuerpo?: string,
        public img?: string,
        public usuario?: _ArticuloUser,
        public leyes?: Ley
    ) {}

}

