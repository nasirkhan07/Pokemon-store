import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonData, PokemonList } from './models/pokemonModels';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
 private baseUrl:string="https://pokeapi.co/api/v2/pokemon?";
  constructor(private http: HttpClient) { 

  }

  GetPokemonList(limit:number, offset:number):Observable<PokemonList>{
    return this.http.get<PokemonList>(this.baseUrl+"limit="+limit+"&offset="+offset);
  }

  GetPokemon(pokemonUrl:string):Observable<PokemonData>{
    return this.http.get<PokemonData>(pokemonUrl);
  }
}
