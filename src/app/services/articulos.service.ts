import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Articulo } from '../models/articulos.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }


  cargarArticulos() {

    const url = `${ base_url }/articulos`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, articulo: Articulo[] }) => resp.articulo )
              );
  }

  obtenerArticuloPorId( id: string ) {

    const url = `${ base_url }/articulos/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, articulos: Articulo }) => resp.articulos )
              );
  }

  crearArticulo( articulo: { nombre: string, ley: string } ) {

    const url = `${ base_url }/articulos/`;
    console.log(articulo);
    return this.http.post( url, articulo, this.headers );
    
  }
  
  actualizarArticulo( articulo: Articulo  ) {

    const url = `${ base_url }/articulos/${ articulo._id }`;
    console.log(articulo);
    return this.http.put( url, articulo, this.headers );
  }

  borrarArticulo( _id: string ) {

    const url = `${ base_url }/articulos/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
