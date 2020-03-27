import { Component, OnInit } from '@angular/core';
import {HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  listaHeroes: any[] = [];
  cargando: boolean = false;

  constructor(private _heroe: HeroesService) { }

  ngOnInit(): void {
      this.cargando = true;
      this._heroe.getHeroes().subscribe(
        lista => this.listaHeroes = lista
        )
        
          this.cargando = false;
       

  }

  borrarHeroe(heroe: HeroeModel, i: number){

    Swal.fire({
      title: 'Esta seguro?',
      text: `Está seguro que deseja apagar o heroi ${heroe.nombre}?`,
      icon:'question',
      showConfirmButton: true,
      showCancelButton: true,

    }).then(
      resp => {
        if( resp.value ===  true){

          this._heroe.borrarHeroe( heroe.id ).subscribe()
          this.listaHeroes.splice(i,1)
        }else{
          return;
        }
      }
    )
    
   
    
  }

  // ngDoCheck(){
  //   this._heroe.getHeroes().subscribe(
  //     lista => this.listaHeroes = lista
  //   )
  // }

}
