import { Component, OnInit } from '@angular/core';
import { PokemonList } from '../models/pokemonModels';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonlist: PokemonList |null= null;
  constructor(private pokemonService:PokemonService) { }

 async ngOnInit(): Promise<void> {
    this.pokemonlist= await this.pokemonService.GetPokemonList().toPromise();
    console.dir(this.pokemonlist);
  }

}
