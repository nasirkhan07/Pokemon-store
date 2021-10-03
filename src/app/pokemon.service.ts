import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonData, PokemonList } from './models/pokemonModels';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
 private baseUrl:string="https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
  constructor(private http: HttpClient) { 

  }

  GetPokemonList():Observable<PokemonList>{
    return this.http.get<PokemonList>(this.baseUrl);
  }

  GetPokemon(pokemonUrl:string):Observable<PokemonData>{
    return this.http.get<PokemonData>(pokemonUrl);
  }
}
