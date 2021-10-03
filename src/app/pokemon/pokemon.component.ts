import { Component, Input, OnInit } from '@angular/core';
import { PokemonData } from '../models/pokemonModels';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() name: string | null = null;
  @Input() url: string = "";
  pokemonData: PokemonData|any;
  constructor(private pokemonService: PokemonService) { }

  async ngOnInit(): Promise<void> {
    if (this.url != "") {
      this.pokemonData = await this.pokemonService.GetPokemon(this.url).toPromise();
      console.log(this.pokemonData);

    }
  }

}
