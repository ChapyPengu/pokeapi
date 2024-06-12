import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import PokeapiService from '../services/pokeapi'

function PokemonMoveButton({ move, onClick = () => {} }) {

  return (
    <button className='pokemon__btn-select-move' onClick={onClick}>
      {move.name}
    </button>
  )
}

function PokemonSelectMoves({ moves, show }) {

  const [movesPokemonA, setMovesPokemonA] = useState([])
  const [movesPokemonB, setMovesPokemonB] = useState([])
  const { getContext } = useApp()
  const useContext = getContext()
  const {  } = useContext()

  function getHandleButtonClick(move) {
    return async () => {
      try {
        const moveResponse = PokeapiService.getMoveRequest(move.id)
        // console.log(moveResponse)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className={`modal-shadow ${show ? 'grid' : 'hidden'}`}>
      <div className='pokemon__select-moves'>
        {
          moves.map((move, i) => <PokemonMoveButton key={i} move={move} onClick={getHandleButtonClick(move)} />)
        }
      </div>
    </div>
  )
}

export default PokemonSelectMoves