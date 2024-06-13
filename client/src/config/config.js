import Type from "../models/type.model.js"

export const AMOUNT_POKEMONS = 20
export const SELECTED_A = 0
export const SELECTED_B = 1
export const MULTIPLAYER = 0
export const SINGLEPLAYER = 1
export const TYPES = {
  normal: new Type('normal', ['fighting'], [], ['rock', 'steel'], ['ghost']),
  fire: new Type('fire', ['water', 'ground', 'rock'], ['ice', 'bug', 'grass', 'steel'], ['rock', 'water', 'dragon', 'fire'], []),
  electric: new Type('electric', ['ground'], ['flying', 'water'], ['grass', 'electric', 'dragon'], []),
  ice: new Type('ice', ['fire', 'rock', 'fighting', 'steel'], ['ground', 'grass', 'flying', 'dragon'], ['water', 'fire', 'steel', 'ice'], []),
  fighting: new Type('fighting', ['flying', 'psychic', 'fairy'], ['normal', 'ice', 'dark', 'rock', 'steel'], ['flying', 'psychic', 'fairy', 'bug', 'poison'], []),
  bug: new Type('bug', ['flying', 'fire', 'rock'], ['grass', 'psychic', 'dark'], ['flying', 'fire', 'fighting', 'steel', 'fairy', 'ghost', 'poison'], []),
  grass: new Type('grass', ['flying', 'fire', 'bug', 'poison', 'ice'], ['water', 'ground', 'rock'], ['flying', 'fire', 'steel', 'poison', 'grass', 'bug', 'dragon'], []),
  ground: new Type('ground', ['water', 'grass', 'ice'], ['electric', 'rock', 'steel', 'poison', 'fire'], ['grass', 'bug'], ['electric']),
  poison: new Type('poison', ['psychic', 'ground'], ['grass', 'fairy'], ['rock', 'ground', 'poison', 'ghost'], []),
  ghost: new Type('ghost', ['dark', 'ghost'], ['psychic', 'ghost'], ['dark'], ['normal', 'fighting']),
  steel: new Type('steel', ['fire', 'ground', 'fighting'], ['ice', 'rock', 'psychic'], ['fire', 'water', 'electric', 'steel'], ['poison']),
  water: new Type('water', ['grass', 'electric'], ['rock', 'ground', 'fire'], ['dragon', 'grass', 'water'], []),
  psychic: new Type('psychic', ['ghost', 'dark', 'bug'], ['poison', 'fighting'], ['steel', 'psychic'], []),
  dragon: new Type('dragon', ['fairy', 'ice', 'dragon'], ['dragon'], ['steel'], []),
  dark: new Type('dark', ['fighting', 'fairy', 'bug'], ['ghost', 'psychic'], ['fairy', 'dark', 'fighting'], []),
  fairy: new Type('fairy', ['steel', 'poison'], ['dark', 'dragon', 'fighting'], ['fire', 'poison', 'steel'], ['dragon']),
  flying : new Type('flying', ['rock', 'electric', 'ice'], ['grass', 'bug', 'fighting'], ['electric', 'rock', 'steel'], ['ground'])
}
export const MOVE_CATEGORY = {
  special: 'special',
  physical: 'physical'
}