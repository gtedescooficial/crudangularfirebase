import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import {Observable } from 'rxjs';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private _heroeService: HeroesService, private _ar:ActivatedRoute) { }

  ngOnInit(): void {

      let id = this._ar.snapshot.paramMap.get('id')

      if( id !== 'nuevo'){
        this._heroeService.getHeroe(id).subscribe( 
          (heroe: HeroeModel) =>{
            this.heroe = heroe
            heroe.id = id
          }
        )

      }
  }

  guardar ( f: NgForm){
    //console.log (this.heroe)
    if( f.invalid){
     // console.log( 'formulario invalido ou incompleto');
      return;
    }
    Swal.fire({
      title: 'Espere!',
      text: 'processando informação',
      icon: 'info',
      allowOutsideClick:false
    
    })
    Swal.showLoading();

    let peticion: Observable<any>

    if( this.heroe.id ){

      peticion = this._heroeService.actualizarHeroe( this.heroe )

    }else{
      peticion = this._heroeService.crearHeroe( this.heroe )
    }

    peticion.subscribe( 
      resp => {
        Swal.fire({
          title: this.heroe.nombre,
          text:'Se processo correctamente',
          icon:'success',

        });
        // Swal.showLoading();
      }
    )
    
  }

}
