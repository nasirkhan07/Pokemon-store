export interface PokemonList{
    count:number;
    next:string;
    previous:string;
    results:PokemonMeta[];
}

export interface PokemonMeta{
    name:string;
    url:string;
}

export interface PokemonAbilityMeta{
    ability:PokemonMeta;
    is_hidden: boolean;
    slot: number;
}

export interface PokemonData{
    abilities:PokemonAbilityMeta[];
    base_experience:number;
    forms:PokemonMeta[];
    game_indices:any[];
    height:number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves:any[];
    name: string;
    order:number;
    past_types:any [];
    sprites:SpritesMeta;
    weight: number;
}
export interface SpritesMeta{
    back_default:string;
    back_female:string;
    back_shiny:string;
    back_shiny_female:string;
    front_default:string;
    front_female:string;
    front_shiny:string;
    front_shiny_female:string;
    other:OtherSpriteMeta;
}
export interface OtherSpriteMeta{
    dream_world:dreamWorldMeta;
    "official-artwork":dreamWorldMeta;
}

export interface dreamWorldMeta{
    front_default:string;
    front_female:string;

}