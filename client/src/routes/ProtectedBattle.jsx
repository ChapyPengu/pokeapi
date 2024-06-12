import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useMultiplayerBattleContext } from '../context/MultiplayerBattleContext'
import { useSingleplayerBattleContext } from '../context/SingleplayerBattleContext'
import { MULTIPLAYER, SINGLEPLAYER } from '../config/config'

function ProtectedBattle() {

  const { currentGame } = useApp()
  const { pokemonA, pokemonB } = currentGame === MULTIPLAYER ? useMultiplayerBattleContext() : useSingleplayerBattleContext()

  if ((!pokemonA.name) && (!pokemonB.name))
    return <Navigate to='/' />

  return <Outlet />
}

export default ProtectedBattle