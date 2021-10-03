import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PokemonList, PokemonMeta } from '../models/pokemonModels';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonlist: PokemonMeta[] | null = null;
  pokemonlistMaster: PokemonList | null = null;
  defaultPageSize: number = 10;
  lastPageSize=10;
  constructor(private pokemonService: PokemonService) { }

  async ngOnInit(): Promise<void> {
    this.pokemonlistMaster = await this.pokemonService.GetPokemonList(this.defaultPageSize,0).toPromise();
    this.pokemonlist = this.pokemonlistMaster.results.slice(0, this.defaultPageSize);
    console.dir(this.pokemonlist);
  }

  searchPokmon(value: string) {
    console.log(value);
  }
  async paginate(event: PageEvent) {
    console.log(event);
    if(this.lastPageSize!=event.pageSize){
    var totalpoks = this.pokemonlistMaster?.results?.length;
    var totalpokCount = this.pokemonlistMaster?.count;

    if (!!totalpoks && totalpoks > 0 && this.pokemonlistMaster != null && ((event.pageIndex+1) * event.pageSize) <= totalpoks) {
      this.pokemonlist = this.pokemonlistMaster.results.slice(event.pageIndex==0?0:(event.pageIndex*event.pageSize), event.pageSize);

    }
    if (!!totalpoks && totalpoks > 0 && this.pokemonlistMaster != null && ((event.pageIndex+1) * event.pageSize) > totalpoks) {
      if (!!totalpokCount && ((event.pageIndex+1) * event.pageSize) <= totalpokCount) {
        this.pokemonlistMaster = await this.pokemonService.GetPokemonList(((event.pageIndex+1) * event.pageSize),event.pageIndex).toPromise();
        this.pokemonlist = this.pokemonlistMaster.results.slice(event.pageIndex==0?0:(event.pageIndex*event.pageSize), event.pageSize);
      }
     
    }
    this.lastPageSize=event.pageSize;

  }
  if(event.previousPageIndex!=event.pageIndex){
    this.pokemonlistMaster = await this.pokemonService.GetPokemonList(( event.pageSize),event.pageIndex==0?0:(event.pageIndex*event.pageSize)).toPromise();
    this.pokemonlist = this.pokemonlistMaster.results.slice(0, event.pageSize);
  }
  }
}
