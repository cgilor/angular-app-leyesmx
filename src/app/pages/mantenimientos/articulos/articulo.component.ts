import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Articulo } from '../../../models/articulos.model';
import { Ley } from '../../..//models/ley.model';
import { ArticulosService } from '../../../services/articulos.service';
import { LeyService } from '../../..//services/ley.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styles: [
  ]
})
export class ArticuloComponent implements OnInit {

  public articuloForm: FormGroup;
  public leyes: Ley[] = [];
  
  public articuloSeleccionado: Articulo;
  public leySeleccionado: Ley;



  constructor( private fb: FormBuilder,
               private leyService: LeyService,
               private articuloService: ArticulosService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarArticulo( id ) );

    this.articuloForm = this.fb.group({
      nombre: ['', Validators.required ],
      leyes: ['', Validators.required ],
      cuerpo: ['', Validators.required ],
      indiceArt: this.fb.array([])
    });

    this.cargarLeyes();

    this.articuloForm.get('leyes').valueChanges
        .subscribe( leyId => {
          console.log(leyId);
          this.leySeleccionado = this.leyes.find( l => l._id === leyId );
        })
  }

  get indiceArt() {
    return this.articuloForm.get('indiceArt') as FormArray;

  }

  

  hacerindice(){

    return  this.fb.group({
      nombreIndice:[''],
      cuerpoIndice:[''],
      SubIndice: this.fb.array([ ])

    });
    
  }
  addIndices(){

    this.indiceArt.push(this.hacerindice());
    
  }
  
  quitarIndice(i: number){
    this.indiceArt.removeAt(i);
  }
  
  SubIndice(i: number) {
    return this.indiceArt.at(i).get('SubIndice') as FormArray;

  }

  hacerSubIndice(){
    return this.fb.group ({
      nombreSubIndice: [''],
      cuerpoSubIndice:[''],
    })
  }

addSubIndice(i: number){
  this.SubIndice(i).push(this.hacerSubIndice());
}
  
  cargarArticulo(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }
    
     this.articuloService.obtenerArticuloPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( articulo => {

        if ( !articulo ) {
          return this.router.navigateByUrl(`/dashboard/articulos`);
        }

        const { nombre, leyes:{ _id }, cuerpo } = articulo; 
        this.articuloSeleccionado = articulo;
        this.articuloForm.setValue({ nombre, leyes: _id, cuerpo });
      });

  }

  cargarLeyes() {

    this.leyService.cargarLeyes()
      .subscribe( (leyes: Ley[]) => {
        this.leyes = leyes;
      })

  }

  guardarArticulo() {
    const { nombre } = this.articuloForm.value;

    if ( this.articuloSeleccionado ) {
      // actualizar
      const data = {
        ...this.articuloForm.value,
        _id: this.articuloSeleccionado._id,
        
      }
      this.articuloService.actualizarArticulo( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear
      
      this.articuloService.crearArticulo( this.articuloForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/articulos/${ resp.articulo._id }`)
        })
    }


  }
}
