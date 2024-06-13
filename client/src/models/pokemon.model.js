import { MOVE_CATEGORY } from "../config/config"
import { random } from "../utilities/number"
import { TYPES } from "../config/config"

class Pokemon {
  constructor(name, hp, attack, defense, specialAttack, specialDefense, speed, types, back_sprite, front_sprite, allMoves, currentHp, currentMoves) {
    this.name = name
    this.hp = hp
    this.attack = attack
    this.defense = defense
    this.specialAttack = specialAttack
    this.specialDefense = specialDefense
    this.speed = speed
    this.types = types
    this.back_sprite = back_sprite
    this.front_sprite = front_sprite
    this.allMoves = allMoves
    this.currentHp = currentHp
    this.currentMoves = currentMoves
  }

  calculatePhysicalDamage(pokemon) {
    return this.attack * (pokemon.defense / 500)
  }

  calculateSpecialDamage(pokemon) {
    return this.specialAttack * (pokemon.specialDefense / 500)
  }

  attackTo(pokemon, move) {
    let damage
    if (move.category === MOVE_CATEGORY.special) {
      damage = this.calculateSpecialDamage(pokemon)
    } else if (move.category === MOVE_CATEGORY.physical) {
      damage = this.calculatePhysicalDamage(pokemon)
    }
    if (this.types.includes(move.type)) {
      damage *= 1.5
    }
    damage = parseInt(damage)
    const n = random(0, 14)
    if (n === 7) {
      pokemon.currentHp -= damage * 2
    } else {
      pokemon.currentHp -= damage
    }
  }

  copy() {
    return new Pokemon(
      this.name,
      this.hp,
      this.attack,
      this.defense,
      this.specialAttack,
      this.specialDefense,
      this.speed,
      this.types,
      this.back_sprite,
      this.front_sprite,
      this.moves,
      this.currentHp,
      this.currentMoves
    )
  }
}

export default Pokemon