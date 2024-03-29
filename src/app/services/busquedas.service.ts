import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { Ley } from '../models/ley.model';
import { Articulo } from '../models/articulos.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )  
    );
  }
  private transformarHospitales( resultados: any[] ): Ley[] {
    return resultados;
  }

  private transformarMedicos( resultados: any[] ): Articulo[] {
    return resultados;
  }
  
  busquedaglobal(termino: string){
    const url = `${ base_url }/todo/${ termino }`;
      return this.http.get( url, this.headers );
  }

  buscar( 
      tipo: 'usuarios'|'articulos'|'leyes',
      termino: string
    ) {

      const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
      return this.http.get<any[]>( url, this.headers )
              .pipe(
                map( (resp: any ) => { 
  
                  switch ( tipo ) {
                    case 'usuarios':
                      return this.transformarUsuarios( resp.resultados )
  
                    case 'leyes':
                      return this.transformarHospitales( resp.resultados )
  
                    case 'articulos':
                       return this.transformarMedicos( resp.resultados )
                  
                    default:
                      return [];
                  }
  
                })
              );

  }


}
