import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Ley } from 'src/app/models/ley.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import {LeyService} from '../../../services/ley.service';

@Component({
  selector: 'app-leyes',
  templateUrl: './leyes.component.html',
  styles: [
  ]
})
export class LeyesComponent implements OnInit, OnDestroy {
  public leyes: Ley[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor( private leyService: LeyService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
   this.imgSubs.unsubscribe();
   }

  ngOnInit(): void {

    this.cargarLeyes();
    this.imgSubs  = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(200))
      .subscribe( img => this.cargarLeyes() );
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarLeyes();
    }

    this.busquedasService.buscar( 'leyes', termino )
        .subscribe( resp => {

          this.leyes = resp;

        });
  }

  cargarLeyes() {

    this.cargando = true;
    this.leyService.cargarLeyes()
        .subscribe( leyes => {
          this.cargando = false;
          this.leyes = leyes;
        })

  }
  guardarCambios( ley: Ley ) {

    this.leyService.actualizarLeyes( ley._id, ley.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', ley.nombre, 'success' );
        });

  }

  eliminarLey( ley: Ley ) {

    this.leyService.borrarLeyes( ley._id )
        .subscribe( resp => {
          this.cargarLeyes();
          Swal.fire( 'Borrado', ley.nombre, 'success' );
        });

  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear ley',
      text: 'Ingrese el nombre del nuevo ley',
      input: 'text',
      inputPlaceholder: 'Nombre del ley',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      this.leyService.crearLeyes( value )
        .subscribe( (resp: any) => {
          //this.leyes.push( resp.ley );
          this.cargarLeyes();
          console.log(resp);
          
        })
    }
  }

  abrirModal(ley: Ley) {

    this.modalImagenService.abrirModal( 'leyes', ley._id, ley.img );

  }

}
