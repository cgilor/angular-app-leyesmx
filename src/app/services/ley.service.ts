import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Ley } from '../models/ley.model';


const base_url = environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class LeyService {

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

  cargarLeyes() {

    const url = `${ base_url }/leyes`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, leyes: Ley[] }) => resp.leyes )
              );
  }

  crearLeyes( nombre: string ) {

    const url = `${ base_url }/leyes`;
    return this.http.post( url, { nombre }, this.headers );
  }
  
  actualizarLeyes( _id: string, nombre: string  ) {

    const url = `${ base_url }/leyes/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarLeyes( _id: string ) {

    const url = `${ base_url }/leyes/${ _id }`;
    return this.http.delete( url, this.headers );
  }


}
