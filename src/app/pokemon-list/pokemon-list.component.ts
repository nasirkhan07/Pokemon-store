import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PokemonList, PokemonMeta } from '../models/pokemonModels';
import { PokemonService } from '../pokemon.service';
import { PokemonComponent } from '../pokemon/pokemon.component';

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
  @ViewChildren(PokemonComponent) pokemons!: QueryList<PokemonComponent>;
  constructor(private pokemonService: PokemonService) { }

  async ngOnInit(): Promise<void> {
    this.pokemonlistMaster = await this.pokemonService.GetPokemonList(this.defaultPageSize,0).toPromise();
    this.pokemonlist = this.pokemonlistMaster.results.slice(0, this.defaultPageSize);
    console.dir(this.pokemonlist);
  }

  async searchPokmon(value: string) {
    console.log(value);
    if(value.trim()==""){
      await this.ngOnInit();
      return;

    }
    if(this.pokemonlistMaster!=null){
    this.pokemonlistMaster = await this.pokemonService.GetPokemonList(this.pokemonlistMaster.count,0).toPromise();
    var filterd=this.pokemons.filter(x=>(x.name!=null && x.name.includes(value))
    || x.pokemonData.abilities.some((c:any)=>c.ability.name.includes(value))).map(r=>r.name);
    this.pokemonlist = this.pokemonlistMaster.results.filter(d=>filterd.includes(d.name));


    }

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
