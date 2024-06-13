import axios from 'axios'
import Pokemon from '../models/pokemon.model'
import Move from '../models/move.model'
import { random } from '../utilities/number'
import { TYPES } from '../config/config'

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
})

class PokeapiService {

  static async getPokemonsRequest(index) {
    const response = await instance.get(`pokemon?offset=${index}&limit=20`)
    const responseTackle = await axios.get('https://pokeapi.co/api/v2/move/33')
    const tackleData = responseTackle.data
    const tackle = new Move(
      tackleData.names.find(name => name.language.name === 'es').name,
      tackleData.power,
      tackleData.accuracy,
      tackleData.type.name,
      tackleData.priority,
      tackleData.pp,
      tackleData.damage_class.name
    )
    const data = response.data
    const pokemons = []
    for (const result of data.results) {
      const responsePokemon = await axios.get(result.url)
      const dataPokemon = responsePokemon.data
      const [hp, attack, defense, specialAttack, specialDefense, speed] = dataPokemon.stats
      const allMoves = []
      for (const dataPokemonMove of dataPokemon.moves.slice(0, dataPokemon.moves.length / 2)) {
        const responseMove = await axios.get(dataPokemonMove.move.url)
        const dataMove = responseMove.data
        if (dataMove.power !== null) {
          allMoves.push(new Move(
            dataMove.names.find(name => name.language.name === 'es').name,
            dataMove.power,
            dataMove.accuracy,
            dataMove.type.name,
            dataMove.priority,
            dataMove.pp,
            dataMove.damage_class.name
          ))
        }
      }

      const currentMoves = []

      if (allMoves.length < 4) {
        currentMoves.push(tackle)
      } else {
        while (currentMoves.length < 4) {
          const randomMove = allMoves[random(0, allMoves.length - 1)]
          if (!currentMoves.includes(randomMove)) {
            currentMoves.push(randomMove)
          }
        }
      }

      pokemons.push(new Pokemon(
        result.name,
        hp.base_stat,
        attack.base_stat,
        defense.base_stat,
        specialAttack.base_stat,
        specialDefense.base_stat,
        speed.base_stat,
        dataPokemon.types.map(type => TYPES.find(type.type.name)),
        dataPokemon.sprites.back_default,
        dataPokemon.sprites.front_default,
        allMoves,
        hp.base_stat,
        currentMoves
      ))
    }
    return pokemons
  }
}

export default PokeapiService