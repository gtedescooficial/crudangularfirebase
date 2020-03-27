import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url: string = 'https://angualrcrud-34cf2.firebaseio.com';
  private id: number;

  constructor( private _http:HttpClient) {


   }

   crearHeroe( heroe: HeroeModel){

    return this._http.post(this.url+'/heroes.json',heroe)
      .pipe(
        map( (resp: any) => {
          heroe.id = resp.name
          return heroe
        })
      )
   }

   actualizarHeroe( heroe: HeroeModel ){

    const heroeTemp = {
      ...heroe
    }
    delete heroeTemp.id;

      return this._http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp)
   }

   getHeroes(){
     return this._http.get(`${this.url}/heroes.json`)
      .pipe(
        map( resp => this.makeHeroesArray(resp))
      )
   }

   makeHeroesArray(heroesObj: Object){
    let heroesArray: HeroeModel[] = [];
    if (heroesObj === null ) return [];
    Object.keys(heroesObj).forEach( key =>{
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroesArray.push(heroe);

      
    })

    return heroesArray;
   }

   getHeroe(id: string){
     
     return this._http.get(`${this.url}/heroes/${id}.json`);
   }

   borrarHeroe(id: string){


    return this._http.delete(`${this.url}/heroes/${id}.json`);

   }
}
