import { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { SELECTED_A, SELECTED_B } from '../../config/config'
import { useSingleplayerBattleContext } from '../../context/SingleplayerBattleContext'
import PokemonCard from '../../components/PokemonCard'
import Loading from '../../components/Loading'
import PokeapiService from '../../services/pokeapi'
import { capitalaze } from '../../utilities/string'
import PokemonSelectMoves from '../../components/PokemonSelectMoves'

function SingleplayerGame() {

  const [pokemons, setPokemons] = useState([])
  const [loadingPokemons, setLoadingPokemons] = useState(false)
  const [showPokemonSelectMoves, setShowPokemonSelectMoves] = useState(false)
  const [pokemonSelectMoves, setPokemonSelectMoves] = useState(null)
  const {
    pokemonA,
    pokemonB,
    setPokemonA,
    setPokemonB,
    currentSelected,
    setCurrentSelected,
    btnStartBattle,
    getHandleOnPokemonCardClick
  } = useSingleplayerBattleContext()
  const navigate = useNavigate()
  const { page } = useParams()

  function handlePreviusClick() {
    if (parseInt(page) >= 2)
      navigate(`/home/${parseInt(page) - 1}`)
  }

  function handleNextClick() {
    navigate(`/home/${parseInt(page) + 1}`)
  }

  function handleBattleClick() {
    // setShowPokemonSelectMoves(true)
    // setPokemonSelectMoves(pokemonA)
    navigate('/home/battle')
  }

  function handleRemovePokemonClick(selected) {
    return () => {
      if (selected === SELECTED_A) {
        setPokemonA({})
      } else if (selected === SELECTED_B) {
        setPokemonB({})
      }
    }
  }

  useEffect(() => {
    async function getPokemos() {
      setLoadingPokemons(true)
      try {
        const pokemonsResponse = await PokeapiService.getPokemonsRequest((page - 1) * 20) // si la pagina es 1 trae (0..20), si es 2 trae (20..40) 
        setPokemons(pokemonsResponse)
      } catch (e) {
        console.log(e)
      }
      setLoadingPokemons(false)
    }
    getPokemos()
  }, [page])

  // if (!pokemons.length)
  // return <Navigate to='/1' />

  if (!page || isNaN(parseInt(page)) || parseInt(page) < 1)
  return <Navigate to='/1' />

  return (
    <div>
      <PokemonSelectMoves show={showPokemonSelectMoves} moves={pokemonSelectMoves !== null ? pokemonSelectMoves.moves : []}/>
      <div className='flex justify-between py-4 text-white'>
        <div className='flex gap-4'>
          <button className='btn' onClick={handlePreviusClick}><i className="fa-solid fa-angle-left"></i></button>
          <button className='btn' onClick={handleNextClick}><i className="fa-solid fa-angle-right"></i></button>
        </div>
        <div className='flex gap-4'>
          <div className='home__box-vs'>
            <p className='text-gray-600 hover:text-red-500 hover:underline cursor-pointer' onClick={handleRemovePokemonClick(SELECTED_A)}>{pokemonA.name ? capitalaze(pokemonA.name) : '-'}</p>
            <p className='text-primary'>{'vs'}</p>
            <p className='text-gray-600 hover:text-red-500 hover:underline cursor-pointer' onClick={handleRemovePokemonClick(SELECTED_B)}>{pokemonB.name ? capitalaze(pokemonB.name) : '-'}</p>
          </div>
          <button className='btn' onClick={handleBattleClick} disabled={btnStartBattle}>Battle</button>
        </div>
      </div>
      {
        loadingPokemons
          ? <div className='h-96 flex justify-center items-center'>
            <Loading />
          </div>
          : <div className='w-full app__pokemons'>
            {
              pokemons.map((pokemon, i) => <PokemonCard
                key={i}
                pokemon={pokemon}
                selected={pokemon.name === pokemonA.name || pokemon.name === pokemonB.name}
                currentSelected={currentSelected.name === pokemon.name}
                onClick={getHandleOnPokemonCardClick(pokemon)} />)
            }
          </div>
      }
    </div>
  )
}

export default SingleplayerGame