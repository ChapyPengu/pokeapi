import { capitalaze } from '../utilities/string'
import { getColorType } from '../utilities/pokemon.utilities'

function PokemonCard({ pokemon, selected, currentSelected, onClick = () => { } }) {

  return (
    <div className={`pokemon__card ${selected ? 'pokemon__card-selected' : ''} ${currentSelected ? 'pokemon__card-selected-to-change-animation' : ''}`} onClick={onClick}>
      <div className='w-full flex justify-end items-center gap-1'>
        {
          pokemon.types.map((type, i) => <i key={i} className='fa-solid fa-circle text-[.6rem]' style={{ color: getColorType(type) }} title={type}></i>)
        }
      </div>
      <img src={pokemon.front_sprite} alt={pokemon.name} />
      <p className=''>{capitalaze(pokemon.name)}</p>
    </div>
  )
}

export default PokemonCard