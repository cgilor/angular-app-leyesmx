import { Component, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Articulo } from 'src/app/models/articulos.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { ArticulosService} from '../../../services/articulos.service'

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styles: [
  ]
})
export class ArticulosComponent implements OnInit {

  public cargando: boolean = true;
  public articulos: Articulo[] = [];
  private imgSubs: Subscription;

  constructor( private articulosService: ArticulosService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarArticulos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarArticulos() );
  }

  cargarArticulos() {
    this.cargando = true;
    this.articulosService.cargarArticulos()
      .subscribe( articulos => {
        this.cargando = false;
        this.articulos = articulos;
      });
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarArticulos();
    }

    this.busquedasService.buscar( 'articulos', termino )
        .subscribe( resp => {
          this.articulos = resp;
        });
  }

  abrirModal(articulo: Articulo) {

    this.modalImagenService.abrirModal( 'articulos', articulo._id, articulo.img );

  }

  borrarArticulo( articulo: Articulo ) {

    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${ articulo.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.articulosService.borrarArticulo(articulo._id)
          .subscribe( resp => {
            
            this.cargarArticulos();
            Swal.fire(
              'Articulo borrado',
              `${ articulo.nombre } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

  }

}
