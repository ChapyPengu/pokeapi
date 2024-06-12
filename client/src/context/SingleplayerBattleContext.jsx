import { useState, useEffect, useContext, createContext } from 'react'
import { SELECTED_A, SELECTED_B } from '../config/config'

const SingleplayerBattleContext = createContext()

export function useSingleplayerBattleContext() {
  const context = useContext(SingleplayerBattleContext)
  if (!context)
    throw new Error('context not found')
  return context
}

export function SingleplayerBattleContextProvider({ children }) {

  const [pokemonA, setPokemonA] = useState({})
  const [pokemonB, setPokemonB] = useState({})
  const [currentSelected, setCurrentSelected] = useState({})
  const [btnStartBattle, setBtnStartBattle] = useState(false)

  function getHandleOnPokemonCardClick(pokemon) {
    return () => {
      if (!pokemonA.name) {
        setPokemonA(pokemon)
      } else if (!pokemonB.name) {
        setPokemonB(pokemon)
      } else if (!currentSelected.name) {
        if (pokemon.name === pokemonA.name) {
          setCurrentSelected({ name: pokemon.name, selected: SELECTED_A })
        } else if (pokemon.name === pokemonB.name) {
          setCurrentSelected({ name: pokemon.name, selected: SELECTED_B })
        }
      } else if (currentSelected.name !== undefined) {
        if (currentSelected.selected === SELECTED_A) {
          setPokemonA(pokemon)
        } else if (currentSelected.selected === SELECTED_B) {
          setPokemonB(pokemon)
        } else {
          throw new Error('Exception')
        }
        setCurrentSelected({})
      } else {
        throw new Error('Exception')
      }
    }
  }

  useEffect(() => {
    if (pokemonA.name && pokemonB.name) {
      setBtnStartBattle(false)
    }
  }, [pokemonA, pokemonB])

  return (
    <SingleplayerBattleContext.Provider value={{
      pokemonA,
      setPokemonA,
      pokemonB,
      setPokemonB,
      currentSelected,
      setCurrentSelected,
      btnStartBattle,
      setBtnStartBattle,
      getHandleOnPokemonCardClick
    }}>
      {children}
    </SingleplayerBattleContext.Provider>
  )
}