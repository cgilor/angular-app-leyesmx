interface _LeyUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Ley {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _LeyUser,
    ) {}

}

