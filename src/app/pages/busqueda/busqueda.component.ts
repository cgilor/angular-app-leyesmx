import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/models/articulos.model';
import { Ley } from 'src/app/models/ley.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public articulos: Articulo[] = [];
  public leyes: Ley[] = [];

  constructor(private activedRoute: ActivatedRoute,
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(({termino}) => this.buscarGlobal(termino));
  }

  buscarGlobal(termino: string){
    this.busquedasService.busquedaglobal(termino)
    .subscribe( (resp: any) =>{

        this.usuarios = resp.usuarios;
        this.articulos = resp.articulos;
        this.leyes = resp.leyes;

    })
  }

}
