import { useState, useEffect } from 'react'
import { sleep } from '../utilities/utilities'
import { MULTIPLAYER, SELECTED_A, SELECTED_B, SINGLEPLAYER } from '../config/config'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useMultiplayerBattleContext } from '../context/MultiplayerBattleContext'
import { useSingleplayerBattleContext } from '../context/SingleplayerBattleContext'
import { random } from '../utilities/number'

function Battle() {

  const { currentGame } = useApp()
  const { pokemonA, pokemonB, setPokemonA, setPokemonB } = currentGame === MULTIPLAYER ? useMultiplayerBattleContext() : useSingleplayerBattleContext()
  const [currentTurn, setCurrentTurn] = useState(null)
  const [winState, setWinState] = useState(false)
  const [winPokemon, setWinPokemon] = useState({})
  const [waitTurn, setWaitTurn] = useState(true)
  const navigate = useNavigate()

  function getAnimation(position) {
    return 'battle__animation-attack' + '-' + position
  }

  async function aToB() {
    setCurrentTurn(SELECTED_A)
    await sleep(1)
    setCurrentTurn(null)
    pokemonA.attackTo(pokemonB)
    setPokemonB(pokemonB.copy())
  }

  async function bToA() {
    setCurrentTurn(SELECTED_B)
    await sleep(1)
    setCurrentTurn(null)
    pokemonB.attackTo(pokemonA)
    setPokemonA(pokemonA.copy())
  }

  function getHandleButtonAttackClick(move) {
    return async () => {
      setWaitTurn(false)
      setCurrentTurn(SELECTED_B)
      pokemonB.attackTo(pokemonA, move)
      await sleep(1)
      setCurrentTurn(SELECTED_A)
      pokemonA.attackTo(pokemonB, pokemonA.currentMoves[random(0, pokemonA.currentMoves.length)])
      await sleep(1)
      setCurrentTurn(null)
      setWaitTurn(true)
    }
  }

  useEffect(() => {
    if (currentGame === MULTIPLAYER) {

    } else if (currentGame === SINGLEPLAYER) {
      
      // const idInterval = setInterval(async () => {
      //   if (pokemonA.speed > pokemonB.speed) {
      //     await aToB()
      //     await sleep(1)
      //     if (pokemonB.currentHp <= 0) {
      //       setWinState(true)
      //       setWinPokemon(pokemonA)
      //       clearInterval(idInterval)
      //       return () => {

      //       }
      //     }
      //     await bToA()
      //     if (pokemonA.currentHp <= 0) {
      //       setWinState(true)
      //       setWinPokemon(pokemonB)
      //       clearInterval(idInterval)
      //       return () => {

      //       }
      //     }
      //   } else {
      //     await bToA()
      //     if (pokemonA.currentHp <= 0) {
      //       setWinState(true)
      //       setWinPokemon(pokemonB)
      //       clearInterval(idInterval)
      //       return () => {

      //       }
      //     }
      //     await sleep(1)
      //     await aToB()
      //     if (pokemonB.currentHp <= 0) {
      //       setWinState(true)
      //       setWinPokemon(pokemonA)
      //       clearInterval(idInterval)
      //       return () => {

      //       }
      //     }
      //   }
      // }, 3500)
    }
  }, [])

  return (
    <div className='h-[800px] flex justify-center items-center'>
      {
        winState
          ? <div className='w-[768px]'>
            <p className='text-blue-500 text-2xl text-center font-bold uppercase block border-2 border-blue-500 py-2 rounded-md'>WIN {winPokemon.name}!</p>
            <p className='text-blue-400 text-xl text-center font-medium block border-blue-500 underline mt-4 hover:text-blue-800 cursor-pointer' onClick={() => navigate('/')}>Volver</p>
          </div>
          : <div className='w-[768px] battle'>
            <div className='w-full flex justify-end'>
              <div className='battle__pokemon'>
                <p className='name-a'>{pokemonA.name}</p>
                <div className='life'>
                  <div className='total-life'>
                    <div style={{
                      width: `${pokemonA.currentHp / pokemonA.hp * 100}%`
                    }} className='current-life'>

                    </div>
                  </div>
                </div>
                <img className={`sprite ${currentTurn !== null && currentTurn === SELECTED_A ? getAnimation('front') : ''}`} src={pokemonA.front_sprite} alt={pokemonA.name} />
              </div>
            </div>

            <div className='w-full flex justify-between items-center gap-6'>
              <div className='battle__pokemon'>
                <p className='name-b'>{pokemonB.name}</p>
                <div className='life'>
                  <div className='total-life'>
                    <div style={{
                      width: `${pokemonB.currentHp / pokemonB.hp * 100}%`
                    }} className='current-life'>

                    </div>
                  </div>
                </div>
                <img className={`sprite ${currentTurn !== null && currentTurn === SELECTED_B ? getAnimation('back') : ''}`} src={pokemonB.back_sprite} alt={pokemonB.name} />
              </div>
              <div className='pokemon-battle__moves'>
                {
                  pokemonB.currentMoves.map((move, i) => {
                    return <button key={i} className='pokemon-battle__btn-move' onClick={getHandleButtonAttackClick(move)} disabled={!waitTurn}>{move.name}</button>
                  })
                }
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default Battle